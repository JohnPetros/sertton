import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/ui/checkout/stores/cart_store.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';

import 'package:sertton/drivers/navigation-driver/index.dart';

class CartDialogPresenter {
  final ProductDto product;
  final CartStore _cartStore;
  final NavigationDriver _navigationDriver;
  static const String variationLabel = 'MATERIAL';

  final selectedSku = signal<SkuDto?>(null);
  final quantity = signal<int>(1);
  final isSubmitting = signal<bool>(false);

  late final List<String> variationOptions;

  late final selectedVariationValue = computed(() {
    final sku = selectedSku.value;
    if (sku == null) return null;
    return _getVariationValue(sku);
  });

  late final maxQuantity = computed(() => selectedSku.value?.stock ?? 0);
  late final isOutOfStock = computed(() => maxQuantity.value <= 0);

  late final isInCart = computed(() {
    final sku = selectedSku.value;
    if (sku == null) return false;
    return _cartStore.items.value.any((item) => item.skuId == sku.id);
  });

  late final cartQuantity = computed(() {
    final sku = selectedSku.value;
    if (sku == null) return 0;
    try {
      return _cartStore.items.value
          .firstWhere((item) => item.skuId == sku.id)
          .quantity;
    } catch (_) {
      return 0;
    }
  });

  late final canAdd = computed(
    () =>
        !isOutOfStock.value && !isSubmitting.value && selectedSku.value != null,
  );

  CartDialogPresenter({
    required this.product,
    required CartStore cartStore,
    required NavigationDriver navigationDriver,
  }) : _cartStore = cartStore,
       _navigationDriver = navigationDriver {
    variationOptions = product.skus
        .map((sku) => _getVariationValue(sku))
        .where((value) => value.isNotEmpty)
        .toSet()
        .toList();

    if (product.skus.isNotEmpty) {
      final firstSku = product.skus.first;
      selectedSku.value = firstSku;
      _updateQuantityFromCart(firstSku);
    }
  }

  void selectSku(String variationValue) {
    try {
      final sku = product.skus.firstWhere(
        (sku) => _getVariationValue(sku) == variationValue,
      );
      selectedSku.value = sku;
      _updateQuantityFromCart(sku);
    } catch (_) {}
  }

  void _updateQuantityFromCart(SkuDto? sku) {
    if (sku == null) {
      quantity.value = 1;
      return;
    }

    try {
      final cartItem = _cartStore.items.value.firstWhere(
        (item) => item.skuId == sku.id,
      );
      quantity.value = cartItem.quantity;
    } catch (_) {
      quantity.value = 1;
    }
  }

  void setQuantity(int val) {
    quantity.value = val;
  }

  String _getVariationValue(SkuDto sku) {
    try {
      final variation = sku.variations.firstWhere(
        (v) => v.name.toLowerCase() == variationLabel.toLowerCase(),
      );
      return variation.value;
    } catch (_) {
      return sku.variations.isNotEmpty ? sku.variations.first.value : '';
    }
  }

  Future<void> addToCart() async {
    final sku = selectedSku.value;
    if (sku == null) return;

    isSubmitting.value = true;

    _cartStore.addItem(
      CartItemDto(
        productId: product.id,
        skuId: sku.id,
        quantity: quantity.value,
      ),
    );

    isSubmitting.value = false;
    _navigationDriver.goBack();
    _navigationDriver.goTo(Routes.cart);
  }

  Future<void> removeFromCart() async {
    final sku = selectedSku.value;
    if (sku == null) return;

    isSubmitting.value = true;
    _cartStore.removeItem(sku.id);
    isSubmitting.value = false;
    _navigationDriver.goBack();
  }
}

final cartDialogPresenterProvider = Provider.autoDispose
    .family<CartDialogPresenter, ProductDto>((ref, product) {
      final cartStore = ref.watch(cartStoreProvider);
      final navigationDriver = ref.read(navigationDriverProvider);
      return CartDialogPresenter(
        product: product,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );
    });
