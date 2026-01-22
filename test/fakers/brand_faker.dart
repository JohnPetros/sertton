import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';

class BrandFaker {
  static final faker = Faker();

  static BrandDto fakeDto({String? id, String? name}) {
    return BrandDto(
      id: id ?? faker.guid.guid(),
      name: name ?? faker.company.name(),
    );
  }

  static List<BrandDto> fakeManyDto({
    int count = 10,
    String? id,
    String? name,
  }) {
    return List.generate(count, (index) => fakeDto(id: id, name: name));
  }
}
