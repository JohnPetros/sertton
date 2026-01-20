import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/pagination_response.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class ProductsListPresenter {
  final CatalogService _catalogService;
  late final productsPagination = futureSignal(() => fetchProducts());

  ProductsListPresenter(this._catalogService);

  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts() async {
    return await _catalogService.fetchProducts();
  }

  Future<void> handleTap() async {
    final response = await _catalogService.fetchProducts();
  }
}

final presenterProvider = Provider<ProductsListPresenter>((ref) {
  final catalogService = ref.read(catalogServiceProvider);
  return ProductsListPresenter(catalogService);
});
