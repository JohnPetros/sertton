import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:signals/signals.dart';

class ProductCardPresenter {
  final ProductDto product;
  final NavigationDriver navigationDriver;

  late final SkuDto firstSku = product.skus.first;

  // Computed properties for sub-widgets
  late final salePrice = computed(() => firstSku.salePrice);
  late final discountPrice = computed(() => firstSku.discountPrice);
  late final imageUrl = computed(
    () => firstSku.imageUrl.isNotEmpty ? firstSku.imageUrl : product.imageUrl,
  );

  final isAddingToCart = signal(false);

  ProductCardPresenter({required this.product, required this.navigationDriver});

  void navigateToProductDetails() {
    navigationDriver.go(Routes.product.replaceAll(':productId', product.id));
  }

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
      final navigationDriver = ref.read(navigationDriverProvider);
      return ProductCardPresenter(
        product: product,
        navigationDriver: navigationDriver,
      );
    });
