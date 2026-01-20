import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class ProductsListPresenter {
  final CatalogService _catalogService;

  final products = signal<List<ProductDto>>([]);
  final isLoading = signal(false);
  final hasMore = signal(true);
  final error = signal<String?>(null);

  int _currentPage = 1;

  ProductsListPresenter(this._catalogService) {
    loadProducts();
  }

  Future<void> loadProducts() async {
    if (isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    final response = await _catalogService.fetchProducts(page: 1);

    if (response.isSuccessful && response.body != null) {
      final pagination = response.body!;
      products.value = pagination.items;
      _currentPage = pagination.currentPage;
      hasMore.value = pagination.currentPage < pagination.totalPages;
    } else {
      error.value = response.errorMessage ?? 'Erro ao carregar produtos';
    }

    isLoading.value = false;
  }

  Future<void> loadMoreProducts() async {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;

    final nextPage = _currentPage + 1;
    final response = await _catalogService.fetchProducts(page: nextPage);

    if (response.isSuccessful && response.body != null) {
      final pagination = response.body!;
      products.value = [...products.value, ...pagination.items];
      _currentPage = pagination.currentPage;
      hasMore.value = pagination.currentPage < pagination.totalPages;
    } else {
      // Optional: Handle error for pagination silently or show toast
    }

    isLoading.value = false;
  }

  Future<void> refresh() async {
    products.value = [];
    hasMore.value = true;
    _currentPage = 1;
    await loadProducts();
  }
}

final presenterProvider = Provider.autoDispose<ProductsListPresenter>((ref) {
  final catalogService = ref.read(catalogServiceProvider);
  return ProductsListPresenter(catalogService);
});
