import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:sertton/drivers/url-driver/index.dart';
import 'package:signals/signals.dart';

import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/ui/checkout/stores/cart_store.dart';

import 'package:sertton/rest/services.dart';

class CartDisplayItem {
  final String skuId;
  final String name;
  final String imageUrl;
  final String skuCode;
  final String variationName;
  final String variationValue;
  final double salePrice;
  final double discountPrice;
  final int quantity;
  final int maxQuantity;
  final String yampiToken;

  CartDisplayItem({
    required this.skuId,
    required this.name,
    required this.imageUrl,
    required this.skuCode,
    required this.variationName,
    required this.variationValue,
    required this.salePrice,
    required this.discountPrice,
    required this.quantity,
    required this.maxQuantity,
    required this.yampiToken,
  });
}

class CartScreenPresenter {
  final CatalogService _catalogService;
  final CheckoutService _checkoutService;
  final CartStore _cartStore;
  final UrlDriver _urlDriver;

  final isLoading = signal(true);
  final hasError = signal(false);
  final cartDisplayItems = signal<List<CartDisplayItem>>([]);

  late final itemCount = computed(() {
    return cartDisplayItems.value.fold<int>(
      0,
      (sum, item) => sum + item.quantity,
    );
  });

  late final subtotal = computed(() {
    return cartDisplayItems.value.fold<double>(
      0.0,
      (sum, item) => sum + (item.salePrice * item.quantity),
    );
  });

  late final totalDiscount = computed(() {
    return cartDisplayItems.value.fold<double>(
      0.0,
      (sum, item) =>
          sum + ((item.salePrice - item.discountPrice) * item.quantity),
    );
  });

  late final total = computed(() {
    return subtotal.value - totalDiscount.value;
  });

  late final isEmpty = computed(() {
    return cartDisplayItems.value.isEmpty;
  });

  late final canCheckout = computed(() {
    return !isEmpty.value && !isLoading.value;
  });

  CartScreenPresenter({
    required CatalogService catalogService,
    required CheckoutService checkoutService,
    required CartStore cartStore,
    required UrlDriver urlDriver,
  }) : _catalogService = catalogService,
       _checkoutService = checkoutService,
       _cartStore = cartStore,
       _urlDriver = urlDriver {
    effect(() async {
      _cartStore.items.value;
      loadCartProducts();
    });
  }

  Future<void> loadCartProducts() async {
    isLoading.value = true;
    hasError.value = false;

    final cartItems = _cartStore.items.value;
    if (cartItems.isEmpty) {
      cartDisplayItems.value = [];
      isLoading.value = false;
      return;
    }

    try {
      final displayItems = <CartDisplayItem>[];

      for (final cartItem in cartItems) {
        final response = await _catalogService.fetchProduct(cartItem.productId);

        if (response.isSuccessful) {
          final product = response.body;
          final sku = _findSkuById(product, cartItem.skuId);

          if (sku != null) {
            displayItems.add(_createDisplayItem(product, sku, cartItem));
          }
        }
      }

      cartDisplayItems.value = displayItems;
    } catch (e) {
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  SkuDto? _findSkuById(ProductDto product, String skuId) {
    try {
      return product.skus.firstWhere((sku) => sku.id == skuId);
    } catch (_) {
      return null;
    }
  }

  CartDisplayItem _createDisplayItem(
    ProductDto product,
    SkuDto sku,
    CartItemDto cartItem,
  ) {
    final imageUrl = sku.imageUrl.isNotEmpty ? sku.imageUrl : product.imageUrl;
    final variation = sku.variations.isNotEmpty ? sku.variations.first : null;

    return CartDisplayItem(
      skuId: sku.id,
      name: product.name,
      imageUrl: imageUrl,
      skuCode: sku.skuCode,
      variationName: variation?.name ?? '',
      variationValue: variation?.value ?? '',
      salePrice: sku.salePrice,
      discountPrice: sku.discountPrice,
      quantity: cartItem.quantity,
      maxQuantity: sku.stock,
      yampiToken: sku.yampiToken,
    );
  }

  void updateItemQuantity(String skuId, int quantity) {
    _cartStore.updateQuantity(skuId, quantity);
  }

  void removeItem(String skuId) {
    _cartStore.removeItem(skuId);
  }

  void clearCart() {
    _cartStore.clear();
    cartDisplayItems.value = [];
  }

  Future<void> checkout() async {
    if (!canCheckout.value) return;

    final skuTokens = cartDisplayItems.value
        .map((item) => item.yampiToken)
        .toList();
    final quantities = cartDisplayItems.value
        .map((item) => item.quantity)
        .toList();

    final response = await _checkoutService.fetchCheckoutLink(
      skuTokens,
      quantities,
    );

    if (response.isFailure) return;

    final uri = Uri.parse(response.body);
    if (await _urlDriver.canLaunch(uri)) {
      await _urlDriver.launch(uri);
      clearCart();
    }
  }
}

final cartScreenPresenterProvider = Provider.autoDispose<CartScreenPresenter>((
  ref,
) {
  final catalogService = ref.read(catalogServiceProvider);
  final checkoutService = ref.read(checkoutServiceProvider);
  final cartStore = ref.watch(cartStoreProvider);
  final urlDriver = ref.read(urlDriverProvider);

  return CartScreenPresenter(
    catalogService: catalogService,
    checkoutService: checkoutService,
    cartStore: cartStore,
    urlDriver: urlDriver,
  );
});
