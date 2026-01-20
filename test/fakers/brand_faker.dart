import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';

typedef Props = ({String? id, String? name});

class BrandFaker {
  static final faker = Faker();

  static BrandDto fakeDto({Props props = (id: null, name: null)}) {
    return BrandDto(
      id: props.id ?? faker.guid.guid(),
      name: props.name ?? faker.company.name(),
    );
  }

  static List<BrandDto> fakeManyDto({
    int count = 10,
    Props props = (id: null, name: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
