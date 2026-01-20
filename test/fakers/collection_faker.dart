import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';

typedef Props = ({String? id, String? name, List<ProductDto>? products});

class CollectionFaker {
  static final _faker = Faker();

  static CollectionDto fakeDto({
    Props props = (id: null, name: null, products: null),
  }) {
    return CollectionDto(
      id: props.id ?? _faker.guid.guid(),
      name: props.name ?? _faker.lorem.words(3).join(' '),
    );
  }

  static List<CollectionDto> fakeManyDto({
    int count = 10,
    Props props = (id: null, name: null, products: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
