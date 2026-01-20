import 'package:faker/faker.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';

typedef Props = ({String? id, String? imageUrl});

class BannerFaker {
  static final _faker = Faker();

  static BannerDto fakeDto({Props props = (id: null, imageUrl: null)}) {
    return BannerDto(
      id: props.id ?? _faker.guid.guid(),
      imageUrl: props.imageUrl ?? _faker.image.loremPicsum(),
    );
  }

  static List<BannerDto> fakeManyDto({
    int count = 10,
    Props props = (id: null, imageUrl: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
