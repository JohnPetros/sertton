import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/ui/catalog/stores/catalog_store.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class ProductsListPresenter {
  final CatalogService _catalogService;
  final CatalogStore _catalogStore;

  final products = signal<List<ProductDto>>([]);
  final isLoading = signal(false);
  final hasMore = signal(true);
  final error = signal<String?>(null);

  int _currentPage = 1;
  CancelToken? _cancelToken;
  late final void Function() _disposeEffect;

  ProductsListPresenter(this._catalogService, this._catalogStore) {
    _disposeEffect = effect(() {
      _catalogStore.query.value;
      _catalogStore.categoryId.value;
      _catalogStore.brandsIds.value;
      untracked(() => refresh());
    });
  }

  void dispose() {
    _disposeEffect();
    _cancelToken?.cancel();
  }

  Future<void> loadProducts() async {
    _cancelToken?.cancel('New request started');
    _cancelToken = CancelToken();

    isLoading.value = true;
    error.value = null;

    try {
      final response = await _catalogService.fetchProducts(
        page: 1,
        categoryId: _catalogStore.categoryId.value,
        brandsIds: _catalogStore.brandsIds.value,
        query: _catalogStore.query.value,
      );

      if (!response.isFailure) {
        final pagination = response.body;
        products.value = pagination.items;
        _currentPage = pagination.currentPage;
        hasMore.value = pagination.currentPage < pagination.totalPages;
      } else {
        error.value = response.errorMessage;
      }
    } on DioException catch (e) {
      if (e.type != DioExceptionType.cancel) {
        error.value = e.toString();
      }
    } catch (e) {
      error.value = e.toString();
    } finally {
      if (!(_cancelToken?.isCancelled ?? false)) {
        isLoading.value = false;
      }
    }
  }

  Future<void> loadMoreProducts() async {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;
    _cancelToken = CancelToken();

    try {
      final nextPage = _currentPage + 1;
      final response = await _catalogService.fetchProducts(
        page: nextPage,
        categoryId: _catalogStore.categoryId.value,
        brandsIds: _catalogStore.brandsIds.value,
        query: _catalogStore.query.value,
      );

      if (!response.isFailure) {
        final pagination = response.body;
        products.value = [...products.value, ...pagination.items];
        _currentPage = pagination.currentPage;
        hasMore.value = pagination.currentPage < pagination.totalPages;
      }
    } on DioException catch (e) {
      if (e.type != DioExceptionType.cancel) {
        error.value = e.toString();
      }
    } catch (e) {
      error.value = e.toString();
    } finally {
      if (!(_cancelToken?.isCancelled ?? false)) {
        isLoading.value = false;
      }
    }
  }

  Future<void> refresh() async {
    products.value = [];
    hasMore.value = true;
    _currentPage = 1;
    await loadProducts();
  }

  void applyFilter({
    String? categoryId,
    List<String> brandsIds = const [],
    String? query,
  }) {
    batch(() {
      _catalogStore.categoryId.value = categoryId;
      _catalogStore.brandsIds.value = brandsIds;
      _catalogStore.query.value = query;
    });
  }

  void search(String? term) {
    _catalogStore.query.value = term;
  }
}

final presenterProvider = Provider.autoDispose<ProductsListPresenter>((ref) {
  final catalogService = ref.read(catalogServiceProvider);
  final catalogStore = ref.read(catalogStoreProvider);
  final presenter = ProductsListPresenter(catalogService, catalogStore);
  ref.onDispose(() => presenter.dispose());
  return presenter;
});
