import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/dtos/variation_dto.dart';
import 'variation_faker.dart';

typedef Props = ({
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
});

class SkuFaker {
  static final _faker = Faker();

  static SkuDto fakeDto({
    Props props = (
      id: null,
      skuCode: null,
      costPrice: null,
      salePrice: null,
      discountPrice: null,
      weight: null,
      height: null,
      width: null,
      length: null,
      imageUrl: null,
      variations: null,
      stock: null,
      yampiToken: null,
    ),
  }) {
    final salePrice =
        props.salePrice ?? _faker.randomGenerator.decimal(scale: 100, min: 10);
    final discountPrice = props.discountPrice ?? salePrice * 0.9;
    final costPrice = props.costPrice ?? salePrice * 0.6;

    return SkuDto(
      id: props.id ?? _faker.guid.guid(),
      skuCode:
          props.skuCode ??
          'SKU-${_faker.randomGenerator.integer(999999, min: 100000)}',
      costPrice: costPrice,
      salePrice: salePrice,
      discountPrice: discountPrice,
      weight:
          props.weight ?? _faker.randomGenerator.decimal(scale: 5, min: 0.1),
      height: props.height ?? _faker.randomGenerator.decimal(scale: 50, min: 1),
      width: props.width ?? _faker.randomGenerator.decimal(scale: 50, min: 1),
      length: props.length ?? _faker.randomGenerator.decimal(scale: 50, min: 1),
      imageUrl: props.imageUrl ?? _faker.image.loremPicsum(),
      variations: props.variations ?? VariationFaker.fakeManyDto(count: 2),
      stock: props.stock ?? _faker.randomGenerator.integer(100, min: 0),
      yampiToken: props.yampiToken ?? _faker.guid.guid(),
    );
  }

  static List<SkuDto> fakeManyDto({
    int count = 10,
    Props props = (
      id: null,
      skuCode: null,
      costPrice: null,
      salePrice: null,
      discountPrice: null,
      weight: null,
      height: null,
      width: null,
      length: null,
      imageUrl: null,
      variations: null,
      stock: null,
      yampiToken: null,
    ),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
