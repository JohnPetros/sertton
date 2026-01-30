import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/checkout/dtos/installment_dto.dart';
import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals_flutter.dart';

class InstallmentsPresenter {
  final CheckoutService _checkoutService;
  final String productId;
  final double productPrice;

  InstallmentsPresenter(
    this._checkoutService, {
    required this.productId,
    required this.productPrice,
  }) {
    _init();
  }

  final isLoading = signal(false);
  final payments = signal<List<PaymentDto>>([]);
  final selectedPaymentId = signal<String?>(null);
  final installments = signal<List<InstallmentDto>>([]);
  final error = signal<String?>(null);

  Future<void> _init() async {
    await loadPayments();
  }

  Future<void> loadPayments() async {
    try {
      isLoading.value = true;
      error.value = null;
      final response = await _checkoutService.fetchPayments();

      final allPayments = response.body;
      final creditCards = allPayments
          .where((p) => p.method == PaymentMethod.creditCard)
          .toList();

      payments.value = creditCards;

      if (creditCards.isNotEmpty) {
        selectPayment(creditCards.first.id);
      } else {
        // If no credit cards, maybe we should stop loading?
        // But let's leave it empty.
      }
    } catch (e) {
      error.value = 'Erro ao carregar formas de pagamento';
    } finally {
      if (payments.value.isEmpty) {
        isLoading.value = false;
      }
    }
  }

  Future<void> selectPayment(String paymentId) async {
    selectedPaymentId.value = paymentId;
    await loadInstallments();
  }

  Future<void> loadInstallments() async {
    final paymentId = selectedPaymentId.value;
    if (paymentId == null) return;

    try {
      isLoading.value = true;
      error.value = null;

      final response = await _checkoutService.fetchInstallments(
        paymentId,
        productId,
        productPrice,
      );

      installments.value = response.body;
    } catch (e) {
      error.value = 'Erro ao carregar parcelas';
      installments.value = [];
    } finally {
      isLoading.value = false;
    }
  }
}

final installmentsPresenterProvider = Provider.autoDispose
    .family<InstallmentsPresenter, ({String productId, double productPrice})>((
      ref,
      args,
    ) {
      final checkoutService = ref.read(checkoutServiceProvider);
      return InstallmentsPresenter(
        checkoutService,
        productId: args.productId,
        productPrice: args.productPrice,
      );
    });
