import 'package:faker/faker.dart';
import 'package:sertton/core/catalog/dtos/variation_dto.dart';

class VariationFaker {
  static final _faker = Faker();

  static VariationDto fakeDto({String? id, String? name, String? value}) {
    return VariationDto(
      id: id ?? _faker.guid.guid(),
      name:
          name ??
          _faker.randomGenerator.element([
            'Cor',
            'Tamanho',
            'Material',
            'Voltagem',
          ]),
      value:
          value ??
          _faker.randomGenerator.element(['Azul', 'P', 'Algodão', '110V']),
    );
  }

  static List<VariationDto> fakeManyDto({
    int count = 10,
    String? id,
    String? name,
    String? value,
  }) {
    return List.generate(
      count,
      (index) => fakeDto(id: id, name: name, value: value),
    );
  }
}
