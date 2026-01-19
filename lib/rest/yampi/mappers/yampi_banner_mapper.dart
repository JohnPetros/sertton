import 'package:sertton/core/marketing/dtos/banner_dto.dart';

class YampiBannerMapper {
  static BannerDto toDto(Map<String, dynamic> yampiBanner) {
    return BannerDto(id: yampiBanner['id'], imageUrl: yampiBanner['image_url']);
  }
}
