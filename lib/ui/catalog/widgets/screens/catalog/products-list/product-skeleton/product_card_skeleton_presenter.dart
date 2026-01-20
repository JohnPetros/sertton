import 'package:flutter_riverpod/flutter_riverpod.dart';

class ProductCardSkeletonPresenter {
  // Configurações do skeleton
  final double imageSize = 130;
  final int skeletonCount = 5;

  ProductCardSkeletonPresenter();
}

final productCardSkeletonPresenterProvider =
    Provider.autoDispose<ProductCardSkeletonPresenter>((ref) {
      return ProductCardSkeletonPresenter();
    });
