import 'package:sertton/core/checkout/dtos/installment_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiInstallmentMapper {
  static InstallmentDto toDto(Json json) {
    return InstallmentDto(
      number: json['installment'] as int,
      value: json['installment_value_formated'] as String,
      totalValue: json['amount_formated'] as String,
      text: json['text'] as String,
      interestFree: (json['tax_value'] as num?) == 0,
    );
  }

  static List<InstallmentDto> toDtoList(Json json) {
    if (json.containsKey('data')) {
      final data = json['data'] as Json;
      if (data.containsKey('installments')) {
        final installments = (data['installments'] as List).cast<Json>();
        return installments.map(toDto).toList();
      }
    }
    return [];
  }
}
