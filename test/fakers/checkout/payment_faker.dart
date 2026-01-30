import 'package:faker/faker.dart';
import 'package:sertton/core/checkout/dtos/payment_dto.dart';

class PaymentFaker {
  static final _faker = Faker();

  static PaymentDto fakeDto({
    String? id,
    String? name,
    String? icon,
    String? pdf,
    PaymentMethod? method,
  }) {
    return PaymentDto(
      id: id ?? _faker.guid.guid(),
      name: name ?? 'Credit Card',
      icon: icon ?? 'credit_card',
      pdf: pdf ?? _faker.internet.httpsUrl(),
      method: method ?? PaymentMethod.creditCard,
    );
  }
}
