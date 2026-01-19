import 'package:sertton/core/catalog/dtos/variation_dto.dart';

class SkuDto {
  String id;
  String skuCode;
  double costPrice;
  double salePrice;
  double discountPrice;
  double weight;
  double height;
  double width;
  double length;
  String imageUrl;
  List<VariationDto> variations;
  int stock;
  String yampiToken;

  SkuDto({
    required this.id,
    required this.skuCode,
    required this.costPrice,
    required this.salePrice,
    required this.discountPrice,
    required this.weight,
    required this.height,
    required this.width,
    required this.length,
    required this.imageUrl,
    required this.variations,
    required this.stock,
    required this.yampiToken,
  });
}
