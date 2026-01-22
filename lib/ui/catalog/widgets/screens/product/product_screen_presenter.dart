import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/core/checkout/stores/cart_store.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class ProductScreenPresenter {
  final String productId;
  final CatalogService catalogService;
  final CartStore _cartStore;

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

  ProductScreenPresenter({
    required this.productId,
    required this.catalogService,
    required CartStore cartStore,
  }) : _cartStore = cartStore {
    _loadProduct();
  }

  Future<void> _loadProduct() async {
    isLoading.value = true;
    hasError.value = false;

    final response = await catalogService.fetchProduct(productId);

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
      CartItemDto(
        productSlug: p.slug,
        skuId: sku.id,
        name: p.name,
        imageUrl: sku.imageUrl.isNotEmpty ? sku.imageUrl : p.imageUrl,
        variationValue: sku.variations.map((v) => v.value).join(', '),
        salePrice: sku.salePrice,
        discountPrice: sku.discountPrice,
        quantity: quantity.value,
      ),
    );

    // Give a brief visual feedback
    await Future.delayed(const Duration(milliseconds: 500));
    isAddingToCart.value = false;
  }

  void retry() {
    _loadProduct();
  }
}

final productScreenPresenterProvider = Provider.autoDispose
    .family<ProductScreenPresenter, String>((ref, productId) {
      final catalogService = ref.read(catalogServiceProvider);
      final cartStore = ref.watch(cartStoreProvider);
      return ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
        cartStore: cartStore,
      );
    });
