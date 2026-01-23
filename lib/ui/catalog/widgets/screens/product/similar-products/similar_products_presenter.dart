import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class SimilarProductsPresenter {
  final CatalogService _catalogService;
  final String productId;

  final products = signal<List<ProductDto>>([]);
  final isLoading = signal(false);
  final error = signal<String?>(null);

  SimilarProductsPresenter(this._catalogService, this.productId) {
    loadProducts();
  }

  Future<void> loadProducts() async {
    isLoading.value = true;
    error.value = null;

    final response = await _catalogService.fetchSimiliarProducts(productId);

    if (response.isSuccessful) {
      products.value = response.body;
    } else {
      error.value = 'Erro ao carregar produtos similares.';
    }

    isLoading.value = false;
  }
}

final similarProductsPresenterProvider = Provider.autoDispose
    .family<SimilarProductsPresenter, String>((ref, productId) {
      final catalogService = ref.read(catalogServiceProvider);
      return SimilarProductsPresenter(catalogService, productId);
    });
