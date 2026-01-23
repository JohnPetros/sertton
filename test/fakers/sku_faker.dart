import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/dtos/variation_dto.dart';
import 'variation_faker.dart';

class SkuFaker {
  static final _faker = Faker();

  static SkuDto fakeDto({
    String? id,
    String? skuCode,
    double? costPrice,
    double? salePrice,
    double? discountPrice,
    double? weight,
    double? height,
    double? width,
    double? length,
    String? imageUrl,
    List<VariationDto>? variations,
    int? stock,
    String? yampiToken,
  }) {
    final effectiveSalePrice =
        salePrice ?? _faker.randomGenerator.decimal(scale: 100, min: 10);
    final effectiveDiscountPrice = discountPrice ?? effectiveSalePrice * 0.9;
    final effectiveCostPrice = costPrice ?? effectiveSalePrice * 0.6;

    return SkuDto(
      id: id ?? _faker.guid.guid(),
      skuCode:
          skuCode ??
          'SKU-${_faker.randomGenerator.integer(999999, min: 100000)}',
      costPrice: effectiveCostPrice,
      salePrice: effectiveSalePrice,
      discountPrice: effectiveDiscountPrice,
      weight: weight ?? _faker.randomGenerator.decimal(scale: 5, min: 0.1),
      height: height ?? _faker.randomGenerator.decimal(scale: 50, min: 1),
      width: width ?? _faker.randomGenerator.decimal(scale: 50, min: 1),
      length: length ?? _faker.randomGenerator.decimal(scale: 50, min: 1),
      imageUrl: imageUrl ?? _faker.image.loremPicsum(),
      variations: variations ?? VariationFaker.fakeManyDto(count: 2),
      stock: stock ?? _faker.randomGenerator.integer(100, min: 0),
      yampiToken: yampiToken ?? _faker.guid.guid(),
    );
  }

  static List<SkuDto> fakeManyDto({
    int count = 10,
    String? id,
    String? skuCode,
    double? costPrice,
    double? salePrice,
    double? discountPrice,
    double? weight,
    double? height,
    double? width,
    double? length,
    String? imageUrl,
    List<VariationDto>? variations,
    int? stock,
    String? yampiToken,
  }) {
    return List.generate(
      count,
      (index) => fakeDto(
        id: id,
        skuCode: skuCode,
        costPrice: costPrice,
        salePrice: salePrice,
        discountPrice: discountPrice,
        weight: weight,
        height: height,
        width: width,
        length: length,
        imageUrl: imageUrl,
        variations: variations,
        stock: stock,
        yampiToken: yampiToken,
      ),
    );
  }
}
