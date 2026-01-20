import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/variation_dto.dart';

typedef Props = ({String? id, String? name, String? value});

class VariationFaker {
  static final _faker = Faker();

  static VariationDto fakeDto({
    Props props = (id: null, name: null, value: null),
  }) {
    return VariationDto(
      id: props.id ?? _faker.guid.guid(),
      name:
          props.name ??
          _faker.randomGenerator.element([
            'Cor',
            'Tamanho',
            'Material',
            'Voltagem',
          ]),
      value:
          props.value ??
          _faker.randomGenerator.element(['Azul', 'P', 'Algodão', '110V']),
    );
  }

  static List<VariationDto> fakeManyDto({
    int count = 10,
    Props props = (id: null, name: null, value: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
