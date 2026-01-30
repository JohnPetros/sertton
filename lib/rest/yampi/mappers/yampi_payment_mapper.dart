import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:sertton/rest/types/json.dart';

class YampiPaymentMapper {
  static PaymentDto toDto(Json json) {
    final methodFromTransaction = json['payment_method'] ?? json['status'];

    return PaymentDto(
      id: json['id'].toString(),
      name:
          json['name'] ??
          json['payment_method_name'] ??
          _getFriendlyMethodName(methodFromTransaction?.toString()) ??
          'Pagamento',
      icon: json['icon_url'] ?? json['payment_method_icon_url'] ?? '',
      pdf: json['billet_url'] ?? json['pix_qr_code_url'],
      method: _mapMethod(json),
    );
  }

  static List<PaymentDto> toDtoList(Json json) {
    if (json.containsKey('data')) {
      final data = (json['data'] as List).cast<Json>();
      return data.map(toDto).toList();
    }
    return [];
  }

  static PaymentDto toDtoFromTransactions(Json json) {
    if (json.containsKey('data')) {
      final List transactions = json['data'];
      if (transactions.isNotEmpty) {
        return toDto(transactions.first);
      }
    }

    return PaymentDto(
      id: '',
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
      case 'checkout_billet':
        return 'Boleto / Pix';
      case 'pix':
      case 'checkout_pix':
        return 'Pix';
      default:
        return null;
    }
  }

  static PaymentMethod _mapMethod(Json json) {
    if (json['is_credit_card'] == true) return PaymentMethod.creditCard;
    if (json['is_billet'] == true) return PaymentMethod.boleto;
    if (json['is_pix'] == true || json['is_pix_in_installments'] == true) {
      return PaymentMethod.pix;
    }

    final method = json['payment_method'] ?? json['status'];
    if (method == null) return PaymentMethod.boleto;

    final methodString = method.toString().toLowerCase();

    if (methodString.contains('credit_card')) return PaymentMethod.creditCard;
    if (methodString.contains('billet')) return PaymentMethod.boleto;
    if (methodString.contains('pix')) return PaymentMethod.pix;
    if (methodString == 'waiting_payment') return PaymentMethod.boleto;

    return PaymentMethod.boleto;
  }
}
