import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiCategoryMapper {
  static CategoryDto toDto(Json json) {
    return CategoryDto(
      id: json['id'].toString(),
      name: json['name'],
      description: json['description'],
    );
  }

  static List<CategoryDto> toDtoList(Json json) {
    final data = (json['data'] as List).cast<Json>();
    return data.map(toDto).toList();
  }
}
