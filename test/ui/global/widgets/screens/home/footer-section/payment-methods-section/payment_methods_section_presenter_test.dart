import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/payment_methods_section_presenter.dart';
import 'package:sertton/core/global/responses/rest_response.dart';

import '../../../../../../../fakers/checkout/payment_faker.dart';

class MockCheckoutService extends Mock implements CheckoutService {}

void main() {
  late CheckoutService checkoutService;
  late PaymentMethodsSectionPresenter presenter;

  setUp(() {
    checkoutService = MockCheckoutService();
  });

  group('PaymentMethodsSectionPresenter', () {
    test('should load payment methods successfully', () async {
      final payments = [
        PaymentFaker.fakeDto(method: PaymentMethod.creditCard),
        PaymentFaker.fakeDto(method: PaymentMethod.pix),
      ];

      when(
        () => checkoutService.fetchPayments(),
      ).thenAnswer((_) async => RestResponse(statusCode: 200, body: payments));

      presenter = PaymentMethodsSectionPresenter(checkoutService);
      // Wait for async execution in constructor
      await Future<void>.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.paymentMethods.value, hasLength(1)); // Only credit card
      expect(
        presenter.paymentMethods.value.first.method,
        PaymentMethod.creditCard,
      );
    });

    test('should handle empty payment list', () async {
      when(
        () => checkoutService.fetchPayments(),
      ).thenAnswer((_) async => RestResponse(statusCode: 200, body: []));

      presenter = PaymentMethodsSectionPresenter(checkoutService);
      await Future<void>.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.paymentMethods.value, isEmpty);
    });

    test('should handle error when fetching payments', () async {
      when(
        () => checkoutService.fetchPayments(),
      ).thenAnswer((_) async => RestResponse(statusCode: 500, body: null));

      presenter = PaymentMethodsSectionPresenter(checkoutService);
      await Future<void>.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.paymentMethods.value, isEmpty);
    });
  });
}
