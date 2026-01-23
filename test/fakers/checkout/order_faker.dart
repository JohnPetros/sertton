import 'package:faker/faker.dart';
import 'package:sertton/core/checkout/dtos/address_dto.dart';
import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'package:sertton/core/checkout/dtos/order_item_dto.dart';
import 'package:sertton/core/checkout/dtos/payment_dto.dart';

import 'address_faker.dart';
import 'order_item_faker.dart';
import 'payment_faker.dart';

class OrderFaker {
  static final _faker = Faker();

  static OrderDto fakeDto({
    String? number,
    OrderStatus? status,
    String? shippingName,
    double? shippingPrice,
    AddressDto? shippingAddress,
    PaymentDto? payment,
    List<OrderItemDto>? items,
    DateTime? createdAt,
  }) {
    return OrderDto(
      status: status ?? OrderStatus.paid,
      number: number ?? _faker.randomGenerator.integer(99999).toString(),
      shippingName: shippingName ?? 'PAC',
      shippingPrice: shippingPrice ?? _faker.randomGenerator.decimal(),
      shippingAddress: shippingAddress ?? AddressFaker.fakeDto(),
      payment: payment ?? PaymentFaker.fakeDto(),
      items: items ?? OrderItemFaker.fakeManyDto(),
      createdAt: createdAt ?? DateTime.now(),
    );
  }

  static List<OrderDto> fakeManyDto({int count = 5}) {
    return List.generate(count, (_) => fakeDto());
  }
}
