import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/rest/services.dart';

class PaymentMethodsSectionPresenter {
  final CheckoutService _checkoutService;

  final paymentMethods = signal<List<PaymentDto>>([]);
  final isLoading = signal(false);

  PaymentMethodsSectionPresenter(this._checkoutService) {
    loadPayments();
  }

  Future<void> loadPayments() async {
    isLoading.value = true;

    final response = await _checkoutService.fetchPayments();

    if (response.isSuccessful) {
      final allPayments = response.body;
      paymentMethods.value = allPayments
          .where((p) => p.method == PaymentMethod.creditCard)
          .toList();
    }
    isLoading.value = false;
  }
}

final paymentMethodsSectionPresenterProvider =
    Provider.autoDispose<PaymentMethodsSectionPresenter>((ref) {
      final checkoutService = ref.read(checkoutServiceProvider);
      return PaymentMethodsSectionPresenter(checkoutService);
    });
