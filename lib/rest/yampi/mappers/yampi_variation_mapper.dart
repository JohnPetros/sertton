import 'package:sertton/core/catalog/dtos/variation_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiVariationMapper {
  static VariationDto toDto(Json json) {
    return VariationDto(
      id: json['id'].toString(),
      name: json['name'],
      value: json['value'],
    );
  }

  static List<VariationDto> toDtoList(Json json) {
    final data = (json['data'] as List).cast<Json>();
    return data.map(toDto).toList();
  }
}
