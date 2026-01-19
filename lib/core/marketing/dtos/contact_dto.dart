enum ContactOrigin { whatsapp, landline, email }

class ContactDto {
  final ContactOrigin origin;
  final String url;
  final String title;

  ContactDto({required this.origin, required this.url, required this.title});
}
