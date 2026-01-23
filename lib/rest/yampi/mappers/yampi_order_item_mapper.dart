import 'package:sertton/core/checkout/dtos/order_item_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiOrderItemMapper {
  static OrderItemDto toDto(Json json) {
    final skuData = json['sku']?['data'] ?? {};

    return OrderItemDto(
      id: json['id'].toString(),
      quantity: json['quantity'] ?? 0,
      price: double.tryParse(json['price'].toString()) ?? 0.0,
      skuName: skuData['title'] ?? json['sku_name'] ?? '',
      skuCode: skuData['sku'] ?? json['sku_code'] ?? json['item_sku'] ?? '',
      skuSalePrice:
          double.tryParse(
            (skuData['price_sale'] ?? json['price_sale']).toString(),
          ) ??
          0.0,
      skuDiscountPrice:
          double.tryParse(
            (skuData['price_discount'] ?? json['price_discount']).toString(),
          ) ??
          0.0,
    );
  }

  static List<OrderItemDto> toDtoList(Json json) {
    if (json.containsKey('data')) {
      final data = (json['data'] as List).cast<Json>();
      return data.map(toDto).toList();
    }
    return [];
  }
}
