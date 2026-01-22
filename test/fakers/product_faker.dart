import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'brand_faker.dart';
import 'sku_faker.dart';

class ProductFaker {
  static final _faker = Faker();

  static ProductDto fakeDto({
    String? id,
    String? slug,
    String? skuCode,
    String? name,
    String? description,
    String? specifications,
    List<SkuDto>? skus,
    String? imageUrl,
    BrandDto? brand,
  }) {
    final productName = name ?? _faker.lorem.words(3).join(' ');

    return ProductDto(
      id: id ?? _faker.guid.guid(),
      slug: slug ?? productName.toLowerCase().replaceAll(' ', '-'),
      skuCode:
          skuCode ??
          'PRD-${_faker.randomGenerator.integer(999999, min: 100000)}',
      name: productName,
      description: description ?? _faker.lorem.sentences(3).join(' '),
      specifications: specifications ?? _faker.lorem.sentences(2).join(' '),
      skus: skus ?? SkuFaker.fakeManyDto(count: 3),
      imageUrl: imageUrl ?? _faker.image.loremPicsum(),
      brand: brand ?? BrandFaker.fakeDto(),
    );
  }

  static List<ProductDto> fakeManyDto({
    int count = 10,
    String? id,
    String? slug,
    String? skuCode,
    String? name,
    String? description,
    String? specifications,
    List<SkuDto>? skus,
    String? imageUrl,
    BrandDto? brand,
  }) {
    return List.generate(
      count,
      (index) => fakeDto(
        id: id,
        slug: slug,
        skuCode: skuCode,
        name: name,
        description: description,
        specifications: specifications,
        skus: skus,
        imageUrl: imageUrl,
        brand: brand,
      ),
    );
  }
}
