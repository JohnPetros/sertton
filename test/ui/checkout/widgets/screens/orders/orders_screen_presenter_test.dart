import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/core/global/interfaces/cache_driver.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders_screen_presenter.dart';

import '../../../../../fakers/checkout/order_faker.dart';

class MockCheckoutService extends Mock implements CheckoutService {}

class MockCacheDriver extends Mock implements CacheDriver {}

void main() {
  late OrdersScreenPresenter presenter;
  late MockCheckoutService checkoutService;
  late MockCacheDriver cacheDriver;

  setUp(() {
    checkoutService = MockCheckoutService();
    cacheDriver = MockCacheDriver();
    presenter = OrdersScreenPresenter(
      checkoutService: checkoutService,
      cacheDriver: cacheDriver,
    );
  });

  group('OrdersScreenPresenter', () {
    test('should have initial state correct', () {
      expect(presenter.document.value, '');
      expect(presenter.documentType.value, DocumentType.cpf);
      expect(presenter.isIdentified.value, false);
      expect(presenter.orders.value, []);
      expect(presenter.isLoading.value, false);
      expect(presenter.hasError.value, false);
      expect(presenter.errorMessage.value, '');
    });

    group('init', () {
      test(
        'should load document from cache and fetch orders when present (CPF)',
        () async {
          when(
            () => cacheDriver.get('customer_document'),
          ).thenReturn('12345678901');
          when(
            () => checkoutService.fetchOrdersByCustomer('12345678901'),
          ).thenAnswer(
            (_) async => RestResponse(statusCode: 200, body: <OrderDto>[]),
          );

          presenter.init();

          expect(presenter.document.value, '12345678901');
          expect(presenter.documentType.value, DocumentType.cpf);
          expect(presenter.isIdentified.value, true);
          verify(
            () => checkoutService.fetchOrdersByCustomer('12345678901'),
          ).called(1);
        },
      );

      test(
        'should load document from cache and set CNPJ type when length is 14',
        () async {
          when(
            () => cacheDriver.get('customer_document'),
          ).thenReturn('12345678000199');
          when(() => checkoutService.fetchOrdersByCustomer(any())).thenAnswer(
            (_) async => RestResponse(statusCode: 200, body: <OrderDto>[]),
          );

          presenter.init();

          expect(presenter.documentType.value, DocumentType.cnpj);
          verify(
            () => checkoutService.fetchOrdersByCustomer('12345678000199'),
          ).called(1);
        },
      );

      test('should do nothing if cache is empty', () {
        when(() => cacheDriver.get('customer_document')).thenReturn(null);

        presenter.init();

        expect(presenter.document.value, '');
        expect(presenter.isIdentified.value, false);
        verifyNever(() => checkoutService.fetchOrdersByCustomer(any()));
      });
    });

    group('computed properties', () {
      test('isDocumentValid should validate CPF length 11', () {
        presenter.setDocumentType(DocumentType.cpf);
        presenter.setDocument('12345678901'); // 11 digits
        expect(presenter.isDocumentValid.value, true);

        presenter.setDocument('123'); // invalid
        expect(presenter.isDocumentValid.value, false);
      });

      test('isDocumentValid should validate CNPJ length 14', () {
        presenter.setDocumentType(DocumentType.cnpj);
        presenter.setDocument('12345678000199'); // 14 digits
        expect(presenter.isDocumentValid.value, true);

        presenter.setDocument('12345678901'); // 11 digits (invalid for CNPJ)
        expect(presenter.isDocumentValid.value, false);
      });

      test('formattedDocument should format CPF', () {
        presenter.setDocument('12345678901');
        expect(presenter.formattedDocument.value, '123.456.789-01');
      });

      test('formattedDocument should format CNPJ', () {
        presenter.setDocument('12345678000199');
        expect(presenter.formattedDocument.value, '12.345.678/0001-99');
      });

      test('formattedDocument should return raw value if length invalid', () {
        presenter.setDocument('123');
        expect(presenter.formattedDocument.value, '123');
      });

      test('sortedOrders should sort orders by date (newest first)', () {
        final date1 = DateTime(2023, 1, 1);
        final date2 = DateTime(2023, 1, 2);
        final order1 = OrderFaker.fakeDto(createdAt: date1);
        final order2 = OrderFaker.fakeDto(createdAt: date2);

        presenter.orders.value = [order1, order2];

        final sorted = presenter.sortedOrders.value;
        expect(sorted.first, order2);
        expect(sorted.last, order1);
      });
    });

    group('fetchOrders', () {
      test('should not fetch if document is invalid', () async {
        presenter.setDocument('123');
        await presenter.fetchOrders();
        verifyNever(() => checkoutService.fetchOrdersByCustomer(any()));
      });

      test('should fetch successfully and update state', () async {
        final orders = OrderFaker.fakeManyDto(count: 2);
        presenter.setDocument('12345678901');

        when(
          () => checkoutService.fetchOrdersByCustomer('12345678901'),
        ).thenAnswer((_) async => RestResponse(statusCode: 200, body: orders));
        when(
          () => cacheDriver.set('customer_document', '12345678901'),
        ).thenAnswer((_) async {});

        final future = presenter.fetchOrders();

        // Check loading state (needs immediate check before await)
        expect(presenter.isLoading.value, true);
        expect(presenter.hasError.value, false);

        await future;

        expect(presenter.isLoading.value, false);
        expect(presenter.orders.value, orders);
        expect(presenter.isIdentified.value, true);
        verify(
          () => cacheDriver.set('customer_document', '12345678901'),
        ).called(1);
      });

      test('should handle API error', () async {
        presenter.setDocument('12345678901');

        when(
          () => checkoutService.fetchOrdersByCustomer(any()),
        ).thenAnswer((_) async => RestResponse(statusCode: 500, body: []));

        await presenter.fetchOrders();

        expect(presenter.isLoading.value, false);
        expect(presenter.hasError.value, true);
        expect(
          presenter.errorMessage.value,
          'Não foi possível carregar os pedidos.',
        );
      });

      test('should handle exceptions', () async {
        presenter.setDocument('12345678901');

        when(
          () => checkoutService.fetchOrdersByCustomer(any()),
        ).thenThrow(Exception('Error'));

        await presenter.fetchOrders();

        expect(presenter.isLoading.value, false);
        expect(presenter.hasError.value, true);
        expect(presenter.errorMessage.value, 'Ocorreu um erro inesperado.');
      });
    });

    group('logout', () {
      test('should clear state and cache', () {
        when(
          () => cacheDriver.delete('customer_document'),
        ).thenAnswer((_) async {});

        presenter.setDocument('123');
        presenter.orders.value = OrderFaker.fakeManyDto();
        presenter.isIdentified.value = true;

        presenter.logout();

        expect(presenter.document.value, '');
        expect(presenter.orders.value, isEmpty);
        expect(presenter.isIdentified.value, false);
        verify(() => cacheDriver.delete('customer_document')).called(1);
      });
    });
  });
}
