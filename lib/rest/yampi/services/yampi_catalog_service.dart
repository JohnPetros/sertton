import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/pagination_response.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/yampi/mappers/yampi_brand_mapper.dart';
import 'package:sertton/rest/yampi/mappers/yampi_category_mapper.dart';
import 'package:sertton/rest/yampi/mappers/yampi_collection_mapper.dart';
import 'package:sertton/rest/yampi/mappers/yampi_product_mapper.dart';
import 'package:sertton/rest/yampi/services/yampi_service.dart';

class YampiCatalogService extends YampiService implements CatalogService {
  YampiCatalogService(super.restClient, super.envDriver);

  @override
  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts({
    int page = 1,
    String? categoryId,
    List<String> brandsIds = const [],
    String? query,
  }) async {
    final filterParams = _buildFilterParams(
      categoryId: categoryId,
      brandsIds: brandsIds,
      query: query,
    );
    final response = await super.restClient.get(
      '/catalog/products?include=skus,brand,images,texts$filterParams&page=$page',
    );
    return response.mapBody((body) {
      if (response.isFailure) return PaginationResponse();
      return YampiProductMapper.toDtoPagination(body);
    });
  }

  @override
  Future<RestResponse<ProductDto>> fetchProduct(String productId) async {
    final response = await super.restClient.get(
      '/catalog/products/$productId?include=skus,brand,images,texts',
    );
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
  Future<RestResponse<List<BrandDto>>> fetchBrands() async {
    final response = await super.restClient.get('/catalog/brands');
    return response.mapBody<List<BrandDto>>((body) {
      if (response.isFailure) return [];
      return YampiBrandMapper.toDtoList(body);
    });
  }

  @override
  Future<RestResponse<List<CollectionDto>>> fetchCollections() async {
    final response = await super.restClient.get(
      '/catalog/collections?include=products',
    );
    return response.mapBody<List<CollectionDto>>((body) {
      if (response.isFailure) return [];
      return YampiCollectionMapper.toDtoList(body);
    });
  }

  @override
  Future<RestResponse<List<ProductDto>>> fetchProductsByCollection(
    String collectionId,
  ) async {
    final response = await super.restClient.get(
      '/catalog/collections/$collectionId/products?include=images,skus,brand,texts',
    );
    return response.mapBody<List<ProductDto>>((body) {
      if (response.isFailure) return [];
      return YampiProductMapper.toDtoList(body);
    });
  }

  String _buildFilterParams({
    String? categoryId,
    List<String> brandsIds = const [],
    String? query,
  }) {
    final buffer = StringBuffer();

    if (categoryId != null) {
      buffer.write('&category_id[]=$categoryId');
    }

    for (final brandId in brandsIds) {
      buffer.write('&brand_id[]=$brandId');
    }

    if (query != null && query.isNotEmpty) {
      buffer.write('&q=$query');
    }

    return buffer.toString();
  }
}
