import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/checkout/dtos/installment_dto.dart';
import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/ui/catalog/widgets/components/installments-dialog/installments_presenter.dart';
import '../../../../../fakers/checkout/installment_faker.dart';
import '../../../../../fakers/checkout/payment_faker.dart';

class MockCheckoutService extends Mock implements CheckoutService {}

void main() {
  late MockCheckoutService service;
  late InstallmentsPresenter presenter;

  setUp(() {
    service = MockCheckoutService();
  });

  InstallmentsPresenter createPresenter() {
    return InstallmentsPresenter(
      service,
      productId: '123',
      productPrice: 100.0,
    );
  }

  group('InstallmentsPresenter', () {
    test('should load payments on init', () async {
      // Arrange
      final payments = [
        PaymentFaker.fakeDto(method: PaymentMethod.creditCard),
        PaymentFaker.fakeDto(method: PaymentMethod.boleto),
      ];
      when(
        () => service.fetchPayments(),
      ).thenAnswer((_) async => RestResponse(statusCode: 200, body: payments));

      // Also expect fetchInstallments to be called because selectPayment is called automatically for the first credit card
      when(() => service.fetchInstallments(any(), any(), any())).thenAnswer(
        (_) async => RestResponse(statusCode: 200, body: <InstallmentDto>[]),
      );

      // Act
      presenter = createPresenter();
      await Future.delayed(Duration.zero); // Wait for async init

      // Assert
      expect(presenter.payments.value.length, 1); // Only credit cards
      expect(presenter.selectedPaymentId.value, payments[0].id);
      verify(() => service.fetchPayments()).called(1);
    });

    test('should handle payment loading error', () async {
      // Arrange
      when(() => service.fetchPayments()).thenThrow(Exception('Error'));

      // Act
      presenter = createPresenter();
      await Future.delayed(Duration.zero);

      // Assert
      expect(presenter.error.value, 'Erro ao carregar formas de pagamento');
      expect(presenter.isLoading.value, false);
    });

    test('should load installments when payment is selected', () async {
      // Arrange
      final payment = PaymentFaker.fakeDto(method: PaymentMethod.creditCard);
      final installments = [InstallmentFaker.fakeDto()];

      when(
        () => service.fetchPayments(),
      ).thenAnswer((_) async => RestResponse(statusCode: 200, body: [payment]));
      when(
        () => service.fetchInstallments(payment.id, '123', 100.0),
      ).thenAnswer(
        (_) async => RestResponse(statusCode: 200, body: installments),
      );

      // Act
      presenter = createPresenter();
      await Future.delayed(Duration.zero);

      // Assert
      expect(presenter.installments.value, installments);
      verify(
        () => service.fetchInstallments(payment.id, '123', 100.0),
      ).called(1);
    });

    test('should handle installments loading error', () async {
      // Arrange
      final payment = PaymentFaker.fakeDto(method: PaymentMethod.creditCard);
      when(
        () => service.fetchPayments(),
      ).thenAnswer((_) async => RestResponse(statusCode: 200, body: [payment]));
      when(
        () => service.fetchInstallments(any(), any(), any()),
      ).thenThrow(Exception('Error'));

      // Act
      presenter = createPresenter();
      await Future.delayed(Duration.zero);

      // Assert
      expect(presenter.error.value, 'Erro ao carregar parcelas');
      expect(presenter.installments.value, isEmpty);
    });
  });
}
