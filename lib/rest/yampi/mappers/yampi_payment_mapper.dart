import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiPaymentMapper {
  static PaymentDto toDto(Json json) {
    if (json.containsKey('data')) {
      final List transactions = json['data'];
      if (transactions.isNotEmpty) {
        final transaction = transactions.first;
        final methodString =
            transaction['payment_method'] ?? transaction['status'];

        return PaymentDto(
          name:
              transaction['payment_method_name'] ??
              _getFriendlyMethodName(methodString) ??
              'Pagamento',
          icon: transaction['payment_method_icon_url'] ?? '',
          pdf: transaction['billet_url'] ?? transaction['pix_qr_code_url'],
          method: _mapMethod(methodString),
        );
      }
    }

    return PaymentDto(
      name: 'N/A',
      icon: '',
      pdf: null,
      method: PaymentMethod.boleto,
    );
  }

  static String? _getFriendlyMethodName(String? method) {
    if (method == null) return null;
    switch (method.toLowerCase()) {
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'billet':
      case 'waiting_payment':
        return 'Boleto / Pix';
      case 'pix':
        return 'Pix';
      default:
        return null;
    }
  }

  static PaymentMethod _mapMethod(String? method) {
    if (method == null) return PaymentMethod.boleto;
    switch (method.toLowerCase()) {
      case 'credit_card':
        return PaymentMethod.creditCard;
      case 'billet':
      case 'waiting_payment':
        return PaymentMethod.boleto;
      case 'pix':
        return PaymentMethod.pix;
      default:
        return PaymentMethod.boleto;
    }
  }
}
