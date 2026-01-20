import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class MarketingCollectionPresenter {
  final CatalogService _catalogService;
  final String collectionId;

  final products = signal<List<ProductDto>>([]);
  final isLoading = signal(false);
  final error = signal<String?>(null);

  MarketingCollectionPresenter(this._catalogService, this.collectionId) {
    loadProducts();
  }

  Future<void> loadProducts() async {
    isLoading.value = true;
    error.value = null;

    final response = await _catalogService.fetchProductsByCollection(
      collectionId,
    );

    if (response.isSuccessful) {
      products.value = response.body;
    } else {
      error.value = 'Erro ao carregar produtos da coleção.';
    }

    isLoading.value = false;
  }
}

final marketingCollectionPresenterProvider = Provider.autoDispose
    .family<MarketingCollectionPresenter, String>((ref, collectionId) {
      final catalogService = ref.read(catalogServiceProvider);
      return MarketingCollectionPresenter(catalogService, collectionId);
    });
