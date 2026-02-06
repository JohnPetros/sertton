import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/ui/checkout/stores/cart_store.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class ProductScreenPresenter {
  final String _productId;
  final CatalogService _catalogService;
  final CartStore _cartStore;
  final NavigationDriver _navigationDriver;

  final isLoading = signal(true);
  final hasError = signal(false);
  final product = signal<ProductDto?>(null);
  final selectedSku = signal<SkuDto?>(null);
  final quantity = signal(1);
  final isAddingToCart = signal(false);

  late final activeSku = computed(
    () => selectedSku.value ?? product.value?.skus.first,
  );

  late final isOutOfStock = computed(() {
    final sku = activeSku.value;
    return sku != null && sku.stock <= 0;
  });

  late final canAddToCart = computed(() {
    return !isLoading.value &&
        !hasError.value &&
        !isOutOfStock.value &&
        !isAddingToCart.value;
  });

  late final imageUrl = computed(() {
    final sku = activeSku.value;
    if (sku == null) return '';
    return sku.imageUrl.isNotEmpty
        ? sku.imageUrl
        : product.value?.imageUrl ?? '';
  });

  late final variationLabel = computed(() {
    final sku = activeSku.value;
    if (sku == null || sku.variations.isEmpty) return 'VARIAÇÃO';
    return sku.variations.first.name.toUpperCase();
  });

  late final variationOptions = computed(() {
    final p = product.value;
    if (p == null) return <String>[];
    final label = variationLabel.value;
    return p.skus
        .map((sku) => _getVariationValue(sku, label))
        .where((value) => value.isNotEmpty)
        .toSet()
        .toList();
  });

  late final selectedVariationValue = computed(() {
    final sku = activeSku.value;
    if (sku == null) return null;
    return _getVariationValue(sku, variationLabel.value);
  });

  late final maxQuantity = computed(() => activeSku.value?.stock ?? 0);
  late final cartQuantity = computed(() {
    final sku = activeSku.value;
    if (sku == null) return 0;
    final index = _cartStore.items.value.indexWhere(
      (item) => item.skuId == sku.id,
    );
    if (index == -1) return 0;
    return _cartStore.items.value[index].quantity;
  });

  late final isInCart = computed(() => cartQuantity.value > 0);

  ProductScreenPresenter({
    required String productId,
    required CatalogService catalogService,
    required CartStore cartStore,
    required NavigationDriver navigationDriver,
  }) : _productId = productId,
       _catalogService = catalogService,
       _cartStore = cartStore,
       _navigationDriver = navigationDriver {
    _loadProduct();
  }

  Future<void> _loadProduct() async {
    isLoading.value = true;
    hasError.value = false;

    final response = await _catalogService.fetchProduct(_productId);

    if (response.isSuccessful) {
      product.value = response.body;
      if (response.body.skus.isNotEmpty) {
        selectedSku.value = response.body.skus.first;
      }
    } else {
      hasError.value = true;
    }

    isLoading.value = false;
  }

  void selectSku(SkuDto sku) {
    selectedSku.value = sku;
    quantity.value = 1; // Reset quantity on SKU change
  }

  void selectSkuByVariation(String value) {
    final p = product.value;
    if (p == null) return;
    final label = variationLabel.value;
    try {
      final sku = p.skus.firstWhere(
        (sku) => _getVariationValue(sku, label) == value,
      );
      selectSku(sku);
    } catch (_) {}
  }

  void updateQuantity(int value) {
    quantity.value = value;
  }

  String _getVariationValue(SkuDto sku, String label) {
    try {
      final variation = sku.variations.firstWhere(
        (v) => v.name.toLowerCase() == label.toLowerCase(),
      );
      return variation.value;
    } catch (_) {
      return sku.variations.isNotEmpty ? sku.variations.first.value : '';
    }
  }

  Future<void> handleAddToCart() async {
    if (isAddingToCart.value) return;

    final sku = activeSku.value;
    final p = product.value;
    if (sku == null || p == null) return;

    isAddingToCart.value = true;

    _cartStore.addItem(
      CartItemDto(productId: p.id, skuId: sku.id, quantity: quantity.value),
    );

    await Future.delayed(const Duration(milliseconds: 500));
    isAddingToCart.value = false;

    _navigationDriver.goTo(Routes.cart);
  }

  void retry() {
    _loadProduct();
  }

  void goBackToCatalog() {
    _navigationDriver.goTo(Routes.catalog);
  }

  void removeFromCart() {
    final sku = activeSku.value;
    if (sku == null) return;
    _cartStore.removeItem(sku.id);
  }
}

final productScreenPresenterProvider = Provider.autoDispose
    .family<ProductScreenPresenter, String>((ref, productId) {
      final catalogService = ref.read(catalogServiceProvider);
      final cartStore = ref.watch(cartStoreProvider);
      final navigationDriver = ref.watch(navigationDriverProvider);
      return ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );
    });
