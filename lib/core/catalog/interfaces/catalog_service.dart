import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/global/responses/pagination_response.dart';
import 'package:sertton/core/global/responses/rest_response.dart';

abstract class CatalogService {
  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts();
  Future<RestResponse<ProductDto>> fetchProduct();
  Future<RestResponse<List<CollectionDto>>> fetchCollections();
  Future<RestResponse<List<CategoryDto>>> fetchCategories();
  Future<RestResponse<List<ProductDto>>> fetchProductsByCollection(
    String collectionId,
  );
}
