import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:signals/signals.dart';

class ProductCardPresenter {
  final ProductDto product;

  late final SkuDto firstSku = product.skus.first;

  // Computed properties for sub-widgets
  late final salePrice = computed(() => firstSku.salePrice);
  late final discountPrice = computed(() => firstSku.discountPrice);
  late final imageUrl = computed(
    () => firstSku.imageUrl.isNotEmpty ? firstSku.imageUrl : product.imageUrl,
  );

  final isAddingToCart = signal(false);

  ProductCardPresenter(this.product);

  Future<void> handleAddToCart() async {
    // Logic to add to cart
    isAddingToCart.value = true;

    // Simulate API call
    await Future.delayed(const Duration(milliseconds: 500));

    // Here we would typically call a CartService

    isAddingToCart.value = false;
  }
}

final productCardPresenterProvider = Provider.autoDispose
    .family<ProductCardPresenter, ProductDto>((ref, product) {
      return ProductCardPresenter(product);
    });
