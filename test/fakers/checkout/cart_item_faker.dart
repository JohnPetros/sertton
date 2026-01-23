import 'package:faker/faker.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';

class CartItemFaker {
  static final _faker = Faker();

  static CartItemDto fakeDto({
    String? productId,
    String? skuId,
    int? quantity,
  }) {
    return CartItemDto(
      productId: productId ?? _faker.guid.guid(),
      skuId: skuId ?? _faker.guid.guid(),
      quantity: quantity ?? _faker.randomGenerator.integer(10, min: 1),
    );
  }

  static List<CartItemDto> fakeManyDto({
    int count = 10,
    String? productId,
    String? skuId,
    int? quantity,
  }) {
    return List.generate(
      count,
      (index) =>
          fakeDto(productId: productId, skuId: skuId, quantity: quantity),
    );
  }
}
