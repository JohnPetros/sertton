import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart'
    hide Scaffold, showDialog, CircularProgressIndicator;
import 'package:sertton/ui/catalog/widgets/components/installments-dialog/installments_dialog_view.dart';
import 'package:sertton/ui/catalog/widgets/components/installments-dialog/installments_presenter.dart';
import 'package:signals/signals_flutter.dart';
import '../../../../../fakers/checkout/installment_faker.dart';
import '../../../../../fakers/checkout/payment_faker.dart';
import '../../../../../helpers/test_http_overrides.dart';

class MockInstallmentsPresenter extends Mock implements InstallmentsPresenter {}

void main() {
  late MockInstallmentsPresenter presenter;

  setUp(() {
    presenter = MockInstallmentsPresenter();
  });

  Widget createWidget({required Widget child}) {
    return ProviderScope(
      overrides: [
        installmentsPresenterProvider.overrideWith((ref, args) => presenter),
      ],
      child: ShadcnApp(
        home: Scaffold(
          body: Builder(
            builder: (context) => Button.primary(
              onPressed: () {
                showDialog(context: context, builder: (_) => child);
              },
              child: const Text('Open Dialog'),
            ),
          ),
        ),
      ),
    );
  }

  group('InstallmentsDialogView', () {
    testWidgets('should render loading state initially', (tester) async {
      when(() => presenter.isLoading).thenReturn(signal(true));
      when(() => presenter.payments).thenReturn(signal([]));
      when(() => presenter.installments).thenReturn(signal([]));
      when(() => presenter.error).thenReturn(signal(null));
      when(() => presenter.selectedPaymentId).thenReturn(signal(null));

      await tester.pumpWidget(
        createWidget(
          child: const InstallmentsDialogView(
            productId: '1',
            productPrice: 100.0,
          ),
        ),
      );

      await tester.tap(find.text('Open Dialog'));
      await tester.pump(const Duration(seconds: 1)); // Dialog animation

      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      expect(find.text('Parcelamento'), findsOneWidget);
    });

    testWidgets('should render error state', (tester) async {
      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.payments).thenReturn(signal([]));
      when(() => presenter.installments).thenReturn(signal([]));
      when(() => presenter.error).thenReturn(signal('Erro ao carregar'));
      when(() => presenter.selectedPaymentId).thenReturn(signal(null));

      await tester.pumpWidget(
        createWidget(
          child: const InstallmentsDialogView(
            productId: '1',
            productPrice: 100.0,
          ),
        ),
      );

      await tester.tap(find.text('Open Dialog'));
      await tester.pumpAndSettle();

      expect(find.text('Erro ao carregar'), findsOneWidget);
      expect(find.text('Tentar novamente'), findsOneWidget);
    });

    testWidgets('should render payments and installments', (tester) async {
      final payments = [PaymentFaker.fakeDto(name: 'Visa', id: '1')];
      final installments = [
        InstallmentFaker.fakeDto(value: 'R\$ 100,00', text: '1x de R\$ 100,00'),
      ];

      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.payments).thenReturn(signal(payments));
      when(() => presenter.installments).thenReturn(signal(installments));
      when(() => presenter.error).thenReturn(signal(null));
      when(() => presenter.selectedPaymentId).thenReturn(signal('1'));

      await HttpOverrides.runZoned(
        () async {
          await tester.pumpWidget(
            createWidget(
              child: const InstallmentsDialogView(
                productId: '1',
                productPrice: 100.0,
              ),
            ),
          );

          await tester.tap(find.text('Open Dialog'));
          await tester.pumpAndSettle();
        },
        createHttpClient: (context) =>
            TestHttpOverrides().createHttpClient(context),
      );

      expect(find.text('Visa'), findsOneWidget);
      expect(find.text('1x de R\$ 100,00'), findsOneWidget);
    });
  });
}
