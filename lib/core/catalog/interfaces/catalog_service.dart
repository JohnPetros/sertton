import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/global/responses/pagination_response.dart';
import 'package:sertton/core/global/responses/rest_response.dart';

abstract class CatalogService {
  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts({
    int page = 1,
    String? categoryId,
    List<String> brandsIds = const [],
    String? query,
  });
  Future<RestResponse<ProductDto>> fetchProduct(String productId);
  Future<RestResponse<List<CollectionDto>>> fetchCollections();
  Future<RestResponse<List<CategoryDto>>> fetchCategories();
  Future<RestResponse<List<BrandDto>>> fetchBrands();
  Future<RestResponse<List<ProductDto>>> fetchProductsByCollection(
    String collectionId,
  );
  Future<RestResponse<List<ProductDto>>> fetchSimiliarProducts(
    String productId,
  );
}
