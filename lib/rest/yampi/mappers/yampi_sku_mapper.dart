import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/rest/yampi/mappers/yampi_variation_mapper.dart';
import 'package:sertton/rest/types/json.dart';

class YampiSkuMapper {
  static SkuDto toDto(Json json) {
    return SkuDto(
      id: json['id'].toString(),
      skuCode: json['sku'] ?? '',
      costPrice: (json['price_cost'] ?? 0).toDouble(),
      salePrice: (json['price_sale'] ?? 0).toDouble(),
      discountPrice: (json['price_discount'] ?? 0).toDouble(),
      stock: json['total_in_stock'] ?? 0,
      weight: (json['weight'] ?? 0).toDouble(),
      height: (json['height'] ?? 0).toDouble(),
      width: (json['width'] ?? 0).toDouble(),
      length: (json['length'] ?? 0).toDouble(),
      yampiToken: json['token'] ?? '',
      imageUrl: '',
      variations: json['variations'] != null
          ? (json['variations'] as List)
                .map((v) => YampiVariationMapper.toDto(v))
                .toList()
          : [],
    );
  }

  static List<SkuDto> toDtoList(Json json) {
    final data = (json['data'] as List).cast<Json>();
    return data.map(toDto).toList();
  }
}
