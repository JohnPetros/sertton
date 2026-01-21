import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class ProductScreenPresenter {
  final String productId;
  final CatalogService catalogService;

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

  ProductScreenPresenter({
    required this.productId,
    required this.catalogService,
  }) {
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

  void updateQuantity(int value) {
    quantity.value = value;
  }

  Future<void> handleAddToCart() async {
    if (isAddingToCart.value) return;

    isAddingToCart.value = true;
    // Simulate add to cart logic
    await Future.delayed(const Duration(seconds: 1));
    isAddingToCart.value = false;

    // TODO: Integrate with CartService when available
  }

  void retry() {
    _loadProduct();
  }
}

final productScreenPresenterProvider = Provider.autoDispose
    .family<ProductScreenPresenter, String>((ref, productId) {
      final catalogService = ref.read(catalogServiceProvider);
      return ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
      );
    });
