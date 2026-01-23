import 'package:faker/faker.dart';
import 'package:sertton/core/checkout/dtos/address_dto.dart';

class AddressFaker {
  static final _faker = Faker();

  static AddressDto fakeDto({
    String? id,
    String? receiver,
    String? zipcode,
    String? street,
    String? number,
    String? neighborhood,
    String? complement,
    String? city,
    String? uf,
  }) {
    return AddressDto(
      id: id ?? _faker.guid.guid(),
      receiver: receiver ?? _faker.person.name(),
      zipcode: zipcode ?? '12345-678',
      street: street ?? _faker.address.streetName(),
      number: number ?? _faker.randomGenerator.integer(1000).toString(),
      neighborhood: neighborhood ?? _faker.address.streetSuffix(),
      complement: complement ?? 'Apt ${_faker.randomGenerator.integer(100)}',
      city: city ?? _faker.address.city(),
      uf: uf ?? 'SP',
    );
  }
}
