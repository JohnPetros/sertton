enum PaymentMethod { creditCard, boleto, pix }

class PaymentDto {
  final String name;
  final String icon;
  final String? pdf;
  final PaymentMethod method;

  PaymentDto({
    required this.name,
    required this.icon,
    required this.pdf,
    required this.method,
  });
}
