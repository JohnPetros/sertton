class InstallmentDto {
  final int number;
  final String value;
  final String totalValue;
  final String text;
  final bool interestFree;

  InstallmentDto({
    required this.number,
    required this.value,
    required this.totalValue,
    required this.text,
    required this.interestFree,
  });
}
