class AddressDto {
  final String id;
  final String receiver;
  final String zipcode;
  final String street;
  final String number;
  final String neighborhood;
  final String complement;
  final String city;
  final String uf;

  AddressDto({
    required this.id,
    required this.receiver,
    required this.zipcode,
    required this.street,
    required this.number,
    required this.neighborhood,
    required this.complement,
    required this.city,
    required this.uf,
  });
}
