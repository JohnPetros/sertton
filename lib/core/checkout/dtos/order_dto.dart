import 'package:sertton/core/checkout/dtos/address_dto.dart';
import 'package:sertton/core/checkout/dtos/order_item_dto.dart';
import 'package:sertton/core/checkout/dtos/payment_dto.dart';

enum OrderStatus {
  paid,
  created,
  cancelled,
  refused,
  authorized,
  delivered,
  waitingPayment,
}

class OrderDto {
  final OrderStatus status;
  final String number;
  final String shippingName;
  final double shippingPrice;
  final AddressDto shippingAddress;
  final PaymentDto payment;
  final List<OrderItemDto> items;
  final DateTime createdAt;

  OrderDto({
    required this.status,
    required this.number,
    required this.shippingName,
    required this.shippingPrice,
    required this.shippingAddress,
    required this.items,
    required this.payment,
    required this.createdAt,
  });
}
