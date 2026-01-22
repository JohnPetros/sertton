import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';

class ProductDto {
  String id;
  String slug;
  String skuCode;
  String name;
  String description;
  String specifications;
  List<SkuDto> skus;
  String imageUrl;
  BrandDto brand;

  ProductDto({
    required this.id,
    required this.slug,
    required this.skuCode,
    required this.name,
    required this.description,
    required this.specifications,
    required this.skus,
    required this.imageUrl,
    required this.brand,
  });

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ProductDto && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;
}
