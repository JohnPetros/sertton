import 'package:faker/faker.dart';
import 'package:sertton/core/checkout/dtos/installment_dto.dart';

class InstallmentFaker {
  static final _faker = Faker();

  static InstallmentDto fakeDto({
    int? number,
    String? value,
    String? totalValue,
    String? text,
    bool? interestFree,
  }) {
    final num = number ?? _faker.randomGenerator.integer(12, min: 1);
    final val = value ?? 'R\$ ${_faker.randomGenerator.decimal()}';

    return InstallmentDto(
      number: num,
      value: val,
      totalValue: totalValue ?? 'R\$ ${_faker.randomGenerator.decimal() * num}',
      text: text ?? '${num}x de $val',
      interestFree: interestFree ?? _faker.randomGenerator.boolean(),
    );
  }
}
