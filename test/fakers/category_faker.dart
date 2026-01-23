import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';

class CategoryFaker {
  static final faker = Faker();

  static CategoryDto fakeDto({String? id, String? name, String? description}) {
    return CategoryDto(
      id: id ?? faker.guid.guid(),
      name: name ?? faker.lorem.words(2).join(' '),
      description: description ?? faker.lorem.sentence(),
    );
  }

  static List<CategoryDto> fakeManyDto({
    int count = 10,
    String? id,
    String? name,
    String? description,
  }) {
    return List.generate(
      count,
      (index) => fakeDto(id: id, name: name, description: description),
    );
  }
}
