import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/dtos/fakers/brand_faker.dart';
import 'package:sertton/core/catalog/dtos/fakers/sku_faker.dart';

typedef Props = ({
  String? id,
  String? slug,
  String? skuCode,
  String? name,
  String? description,
  String? specifications,
  List<SkuDto>? skus,
  String? imageUrl,
  BrandDto? brand,
});

class ProductFaker {
  static final _faker = Faker();

  static ProductDto fakeDto({
    Props props = (
      id: null,
      slug: null,
      skuCode: null,
      name: null,
      description: null,
      specifications: null,
      skus: null,
      imageUrl: null,
      brand: null,
    ),
  }) {
    final productName = props.name ?? _faker.lorem.words(3).join(' ');
    final slug = props.slug ?? productName.toLowerCase().replaceAll(' ', '-');

    return ProductDto(
      id: props.id ?? _faker.guid.guid(),
      slug: slug,
      skuCode:
          props.skuCode ??
          'PRD-${_faker.randomGenerator.integer(999999, min: 100000)}',
      name: productName,
      description: props.description ?? _faker.lorem.sentences(3).join(' '),
      specifications:
          props.specifications ?? _faker.lorem.sentences(2).join(' '),
      skus: props.skus ?? SkuFaker.fakeManyDto(count: 3),
      imageUrl: props.imageUrl ?? _faker.image.loremPicsum(),
      brand: props.brand ?? BrandFaker.fakeDto(),
    );
  }

  static List<ProductDto> fakeManyDto({
    int count = 10,
    Props props = (
      id: null,
      slug: null,
      skuCode: null,
      name: null,
      description: null,
      specifications: null,
      skus: null,
      imageUrl: null,
      brand: null,
    ),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
