class SerttonContacts {
  static const String whatsappNumber = '5512988233818';
  static const String whatsappLabel = '(12) 988233818';
  static const String whatsappMessage =
      'Olá, gostaria de saber mais sobre a Sertton.';

  static const String landlineNumber = '551149682964';
  static const String landlineLabel = '(11) 4968-2964';

  static const String emailAddress = 'falecom@sertton.ind.br';

  static String get whatsappUrl =>
      'whatsapp://send?phone=$whatsappNumber&text=${Uri.encodeComponent(whatsappMessage)}';
  static String get whatsappHttpsUrl =>
      'https://wa.me/$whatsappNumber?text=${Uri.encodeComponent(whatsappMessage)}';
  static String get landlineUrl => 'tel:$landlineNumber';
  static String get emailUrl => 'mailto:$emailAddress';
}
