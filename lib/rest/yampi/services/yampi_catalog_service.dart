import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/cursor_pagination_response.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/yampi/services/yampi_service.dart';

class YampiCatalogService extends YampiService implements CatalogService {
  YampiCatalogService(super.restClient, super.envDriver);

  @override
  Future<RestResponse<CursorPaginationResponse<ProductDto>>> fetchProducts() {
    return super.restClient.get('/products');
  }

  @override
  Future<RestResponse<ProductDto>> fetchProduct() {
    return super.restClient.get('/products/1');
  }

  @override
  Future<RestResponse<List<CollectionDto>>> fetchCollections() {
    throw UnimplementedError();
  }

  @override
  Future<RestResponse<List<ProductDto>>> fetchProductsByCollection(
    String collectionId,
  ) {
    throw UnimplementedError();
  }
}
