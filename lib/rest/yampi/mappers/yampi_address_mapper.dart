import 'package:sertton/core/checkout/dtos/address_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiAddressMapper {
  static AddressDto toDto(Json json) {
    if (json.containsKey('data')) {
      json = json['data'];
    }

    return AddressDto(
      id: json['id']?.toString() ?? '',
      receiver: json['receiver'] ?? '',
      zipcode: json['zipcode'] ?? '',
      street: json['street'] ?? '',
      number: json['number'] ?? '',
      neighborhood: json['neighborhood'] ?? '',
      complement: json['complement'] ?? '',
      city: json['city'] ?? '',
      uf: json['uf'] ?? json['state'] ?? '',
    );
  }
}
