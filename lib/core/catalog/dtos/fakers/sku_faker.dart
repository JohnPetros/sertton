import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/catalog/dtos/variation_dto.dart';
import 'package:sertton/core/catalog/dtos/fakers/variation_faker.dart';

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
  final faker = Faker();
  final variationFaker = VariationFaker();

  SkuDto fakeDto({
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
        props.salePrice ?? faker.randomGenerator.decimal(scale: 100, min: 10);
    final discountPrice = props.discountPrice ?? salePrice * 0.9;
    final costPrice = props.costPrice ?? salePrice * 0.6;

    return SkuDto(
      id: props.id ?? faker.guid.guid(),
      skuCode:
          props.skuCode ??
          'SKU-${faker.randomGenerator.integer(999999, min: 100000)}',
      costPrice: costPrice,
      salePrice: salePrice,
      discountPrice: discountPrice,
      weight: props.weight ?? faker.randomGenerator.decimal(scale: 5, min: 0.1),
      height: props.height ?? faker.randomGenerator.decimal(scale: 50, min: 1),
      width: props.width ?? faker.randomGenerator.decimal(scale: 50, min: 1),
      length: props.length ?? faker.randomGenerator.decimal(scale: 50, min: 1),
      imageUrl: props.imageUrl ?? faker.image.image(random: true),
      variations: props.variations ?? variationFaker.fakeManyDto(count: 2),
      stock: props.stock ?? faker.randomGenerator.integer(100, min: 0),
      yampiToken: props.yampiToken ?? faker.guid.guid(),
    );
  }

  List<SkuDto> fakeManyDto({
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
