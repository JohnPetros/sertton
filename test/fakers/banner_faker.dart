import 'package:faker/faker.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';

class BannerFaker {
  static final _faker = Faker();

  static BannerDto fakeDto({String? id, String? imageUrl}) {
    return BannerDto(
      id: id ?? _faker.guid.guid(),
      imageUrl: imageUrl ?? _faker.image.loremPicsum(),
    );
  }

  static List<BannerDto> fakeManyDto({
    int count = 10,
    String? id,
    String? imageUrl,
  }) {
    return List.generate(count, (index) => fakeDto(id: id, imageUrl: imageUrl));
  }
}
