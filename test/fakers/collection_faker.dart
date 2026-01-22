import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';

class CollectionFaker {
  static final _faker = Faker();

  static CollectionDto fakeDto({
    String? id,
    String? name,
    List<ProductDto>? products,
  }) {
    return CollectionDto(
      id: id ?? _faker.guid.guid(),
      name: name ?? _faker.lorem.words(3).join(' '),
    );
  }

  static List<CollectionDto> fakeManyDto({
    int count = 10,
    String? id,
    String? name,
    List<ProductDto>? products,
  }) {
    return List.generate(
      count,
      (index) => fakeDto(id: id, name: name, products: products),
    );
  }
}
