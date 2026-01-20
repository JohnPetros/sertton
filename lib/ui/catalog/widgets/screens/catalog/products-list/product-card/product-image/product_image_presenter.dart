import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class ProductImagePresenter {
  final String imageUrl;

  final isLoading = signal(true);
  final hasError = signal(false);

  ProductImagePresenter(this.imageUrl);

  void onLoadComplete() {
    isLoading.value = false;
  }

  void onLoadError() {
    hasError.value = true;
    isLoading.value = false;
  }
}

final productImagePresenterProvider = Provider.autoDispose
    .family<ProductImagePresenter, String>((ref, imageUrl) {
      return ProductImagePresenter(imageUrl);
    });
