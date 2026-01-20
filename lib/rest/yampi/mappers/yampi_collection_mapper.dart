import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiCollectionMapper {
  static CollectionDto toDto(Json json) {
    return CollectionDto(id: json['id'].toString(), name: json['name'] ?? '');
  }

  static List<CollectionDto> toDtoList(Json json) {
    final data = (json['data'] as List).cast<Json>();
    return data.map(toDto).toList();
  }
}
