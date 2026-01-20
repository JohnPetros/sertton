import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/pagination_response.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/yampi/mappers/yampi_category_mapper.dart';
import 'package:sertton/rest/yampi/mappers/yampi_product_mapper.dart';
import 'package:sertton/rest/yampi/services/yampi_service.dart';

class YampiCatalogService extends YampiService implements CatalogService {
  YampiCatalogService(super.restClient, super.envDriver);

  @override
  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts({
    int page = 1,
  }) async {
    final response = await super.restClient.get(
      '/catalog/products?include=skus,brand,images,texts&page=$page',
    );
    return response.mapBody((body) {
      if (response.isFailure) return PaginationResponse();
      return YampiProductMapper.toDtoPagination(body);
    });
  }

  @override
  Future<RestResponse<ProductDto>> fetchProduct() async {
    final response = await super.restClient.get('/catalog/products/1');
    return response.mapBody<ProductDto>((body) {
      if (response.isFailure) return null;
      return YampiProductMapper.toDto(body);
    });
  }

  @override
  Future<RestResponse<List<CategoryDto>>> fetchCategories() async {
    final response = await super.restClient.get('/catalog/categories');
    return response.mapBody<List<CategoryDto>>((body) {
      if (response.isFailure) return [];
      return YampiCategoryMapper.toDtoList(body);
    });
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
