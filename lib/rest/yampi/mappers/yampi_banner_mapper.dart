import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiBannerMapper {
  static BannerDto toDto(Json json) {
    return BannerDto(id: json['id'].toString(), imageUrl: json['image_url']);
  }

  static List<BannerDto> toDtoList(Json json) {
    final data = (json['data'] as List).cast<Json>();
    return data.map(toDto).toList();
  }
}
