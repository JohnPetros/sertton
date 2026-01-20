import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/variation_dto.dart';

typedef Props = ({String? id, String? name, String? value});

class VariationFaker {
  final faker = Faker();

  VariationDto fakeDto({Props props = (id: null, name: null, value: null)}) {
    return VariationDto(
      id: props.id ?? faker.guid.guid(),
      name:
          props.name ??
          faker.randomGenerator.element([
            'Cor',
            'Tamanho',
            'Material',
            'Voltagem',
          ]),
      value:
          props.value ??
          faker.randomGenerator.element(['Azul', 'P', 'Algodão', '110V']),
    );
  }

  List<VariationDto> fakeManyDto({
    int count = 10,
    Props props = (id: null, name: null, value: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
