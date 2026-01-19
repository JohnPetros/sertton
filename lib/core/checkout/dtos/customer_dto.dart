enum PersonType { natural, legal }

class CustomerDto {
  final String id;
  final PersonType personType;
  final String email;
  final String? name;
  final String? cpf;
  final String? cnpj;
  final String? razaoSocial;
  final String? phone;
  final String? selectedAddressZipcode;
  final bool isActive;

  CustomerDto({
    required this.id,
    required this.personType,
    required this.email,
    this.name,
    this.cpf,
    this.cnpj,
    this.razaoSocial,
    this.phone,
    this.selectedAddressZipcode,
    required this.isActive,
  });
}
