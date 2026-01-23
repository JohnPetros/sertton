import 'package:faker/faker.dart';
import 'package:sertton/core/checkout/dtos/order_item_dto.dart';

class OrderItemFaker {
  static final _faker = Faker();

  static OrderItemDto fakeDto({
    String? id,
    int? quantity,
    double? price,
    String? skuName,
    String? skuCode,
    double? skuSalePrice,
    double? skuDiscountPrice,
  }) {
    return OrderItemDto(
      id: id ?? _faker.guid.guid(),
      quantity: quantity ?? _faker.randomGenerator.integer(5, min: 1),
      price: price ?? _faker.randomGenerator.decimal(),
      skuName: skuName ?? _faker.food.dish(),
      skuCode: skuCode ?? _faker.guid.guid(),
      skuSalePrice: skuSalePrice ?? _faker.randomGenerator.decimal(),
      skuDiscountPrice: skuDiscountPrice ?? _faker.randomGenerator.decimal(),
    );
  }

  static List<OrderItemDto> fakeManyDto({int count = 3}) {
    return List.generate(count, (_) => fakeDto());
  }
}
