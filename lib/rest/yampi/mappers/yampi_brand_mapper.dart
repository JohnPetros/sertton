import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiBrandMapper {
  static BrandDto toDto(Json json) {
    return BrandDto(id: json['id'].toString(), name: json['name']);
  }

  static List<BrandDto> toDtoList(Json json) {
    final data = (json['data'] as List).cast<Json>();
    return data.map(toDto).toList();
  }
}
