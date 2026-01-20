import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';

typedef Props = ({String? id, String? name, String? description});

class CategoryFaker {
  static final faker = Faker();

  static CategoryDto fakeDto({
    Props props = (id: null, name: null, description: null),
  }) {
    return CategoryDto(
      id: props.id ?? faker.guid.guid(),
      name: props.name ?? faker.lorem.words(2).join(' '),
      description: props.description ?? faker.lorem.sentence(),
    );
  }

  static List<CategoryDto> fakeManyDto({
    int count = 10,
    Props props = (id: null, name: null, description: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
