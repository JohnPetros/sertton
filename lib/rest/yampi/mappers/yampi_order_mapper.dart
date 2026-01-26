import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'package:sertton/rest/types/json.dart';
import 'package:sertton/rest/yampi/mappers/yampi_address_mapper.dart';
import 'package:sertton/rest/yampi/mappers/yampi_order_item_mapper.dart';
import 'package:sertton/rest/yampi/mappers/yampi_payment_mapper.dart';

class YampiOrderMapper {
  static OrderDto toDto(Json json) {
    if (json.containsKey('data')) {
      json = json['data'];
    }

    final statusData = json['status']?['data'];
    final statusAlias = statusData?['alias'] ?? json['status_alias'] ?? '';

    return OrderDto(
      status: _mapStatus(statusAlias),
      number: json['number']?.toString() ?? '',
      shippingName: json['shipment_service'] ?? json['shipping_service'] ?? '',
      shippingPrice:
          double.tryParse(
            (json['value_shipment'] ?? json['price_shipment']).toString(),
          ) ??
          0.0,
      shippingAddress: YampiAddressMapper.toDto(json['shipping_address'] ?? {}),
      items: YampiOrderItemMapper.toDtoList(json['items'] ?? {}),
      payment: YampiPaymentMapper.toDtoFromTransactions(
        json['transactions'] ?? {},
      ),
      createdAt:
          DateTime.tryParse(json['created_at']?['date'] ?? '') ??
          DateTime.now(),
    );
  }

  static List<OrderDto> toDtoList(Json json) {
    if (json.containsKey('data')) {
      final data = (json['data'] as List).cast<Json>();
      return data.map(toDto).toList();
    }
    return [];
  }

  static OrderStatus _mapStatus(String alias) {
    switch (alias) {
      case 'paid':
        return OrderStatus.paid;
      case 'created':
        return OrderStatus.created;
      case 'cancelled':
        return OrderStatus.cancelled;
      case 'refused':
        return OrderStatus.refused;
      case 'authorized':
        return OrderStatus.authorized;
      case 'delivered':
        return OrderStatus.delivered;
      case 'waiting_payment':
        return OrderStatus.waitingPayment;
      default:
        return OrderStatus.created;
    }
  }
}
