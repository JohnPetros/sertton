import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:signals/signals.dart';

class ProductDescriptionPresenter {
  final ProductDto product;

  late final description = signal(product.description);
  late final specifications = signal(product.specifications);

  ProductDescriptionPresenter({required this.product});

  // Helper to strip HTML tags if needed, or we reach for a package
  String cleanHtml(String html) {
    // Simple regex to remove common HTML tags for a cleaner look if no HTML renderer is used
    return html.replaceAll(RegExp(r'<[^>]*>|&nbsp;'), ' ').trim();
  }
}

final productDescriptionPresenterProvider = Provider.autoDispose
    .family<ProductDescriptionPresenter, ProductDto>((ref, product) {
      return ProductDescriptionPresenter(product: product);
    });
