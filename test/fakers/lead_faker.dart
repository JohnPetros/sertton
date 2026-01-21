import 'package:faker/faker.dart';
import 'package:sertton/core/marketing/dtos/lead_dto.dart';

typedef Props = ({String? email, String? name});

class LeadFaker {
  static final _faker = Faker();

  static LeadDto fakeDto({Props props = (email: null, name: null)}) {
    return LeadDto(
      email: props.email ?? _faker.internet.email(),
      name: props.name ?? _faker.person.name(),
    );
  }

  static List<LeadDto> fakeManyDto({
    int count = 10,
    Props props = (email: null, name: null),
  }) {
    return List.generate(count, (index) => fakeDto(props: props));
  }
}
