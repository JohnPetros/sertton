import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/fakers/product_faker.dart';

typedef Props = ({String? id, String? name, List<ProductDto>? products});

class CollectionFaker {
  final faker = Faker();
  final productFaker = ProductFaker();

  CollectionDto fakeDto({
    Props props = (id: null, name: null, products: null),
  }) {
    return CollectionDto(
      id: props.id ?? faker.guid.guid(),
      name: props.name ?? faker.lorem.words(3).join(' '),
      products: props.products ?? productFaker.fakeManyDto(count: 5),
    );
  }

  List<CollectionDto> fakeManyDto({
    int count = 10,
    Props props = (id: null, name: null, products: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
