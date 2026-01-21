import 'package:faker/faker.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';

typedef Props = ({
  String? productSlug,
  String? skuId,
  String? name,
  String? imageUrl,
  String? variationValue,
  double? salePrice,
  double? discountPrice,
  int? quantity,
});

class CartItemFaker {
  static final _faker = Faker();

  static CartItemDto fakeDto({
    Props props = (
      productSlug: null,
      skuId: null,
      name: null,
      imageUrl: null,
      variationValue: null,
      salePrice: null,
      discountPrice: null,
      quantity: null,
    ),
  }) {
    return CartItemDto(
      productSlug: props.productSlug ?? _faker.guid.guid(),
      skuId: props.skuId ?? _faker.guid.guid(),
      name: props.name ?? _faker.lorem.words(3).join(' '),
      imageUrl: props.imageUrl ?? _faker.image.loremPicsum(),
      variationValue: props.variationValue ?? 'Size: M, Color: Blue',
      salePrice:
          props.salePrice ??
          _faker.randomGenerator.decimal(min: 10, scale: 100),
      discountPrice:
          props.discountPrice ??
          _faker.randomGenerator.decimal(min: 5, scale: 50),
      quantity: props.quantity ?? _faker.randomGenerator.integer(10, min: 1),
    );
  }

  static List<CartItemDto> fakeManyDto({
    int count = 10,
    Props props = (
      productSlug: null,
      skuId: null,
      name: null,
      imageUrl: null,
      variationValue: null,
      salePrice: null,
      discountPrice: null,
      quantity: null,
    ),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
