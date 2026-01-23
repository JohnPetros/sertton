import 'package:faker/faker.dart';
import 'package:sertton/core/marketing/dtos/lead_dto.dart';

class LeadFaker {
  static final _faker = Faker();

  static LeadDto fakeDto({String? email, String? name}) {
    return LeadDto(
      email: email ?? _faker.internet.email(),
      name: name ?? _faker.person.name(),
    );
  }

  static List<LeadDto> fakeManyDto({
    int count = 10,
    String? email,
    String? name,
  }) {
    return List.generate(count, (index) => fakeDto(email: email, name: name));
  }
}
