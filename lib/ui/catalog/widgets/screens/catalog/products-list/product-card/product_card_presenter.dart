import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';

import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:sertton/ui/checkout/widgets/components/cart-dialog/index.dart';

class ProductCardPresenter {
  final ProductDto product;
  final NavigationDriver navigationDriver;

  late final SkuDto firstSku = product.skus.first;

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

  void handleAddToCart(BuildContext context) {
    showCartDialog(context, product, navigationDriver);
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
