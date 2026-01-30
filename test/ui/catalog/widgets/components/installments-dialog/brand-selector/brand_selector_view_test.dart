import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' hide Scaffold;
import 'package:sertton/ui/catalog/widgets/components/installments-dialog/brand-selector/brand_selector_view.dart';
import '../../../../../../fakers/checkout/payment_faker.dart';
import '../../../../../../helpers/test_http_overrides.dart';

void main() {
  Widget createWidget({required Widget child}) {
    return ShadcnApp(home: Scaffold(body: child));
  }

  group('BrandSelectorView', () {
    testWidgets('should render correctly with selected payment', (
      tester,
    ) async {
      final payments = [
        PaymentFaker.fakeDto(name: 'Visa', id: '1'),
        PaymentFaker.fakeDto(name: 'Mastercard', id: '2'),
      ];

      await HttpOverrides.runZoned(
        () async {
          await tester.pumpWidget(
            createWidget(
              child: BrandSelectorView(
                payments: payments,
                selectedId: '1',
                onSelect: (_) {},
              ),
            ),
          );
          await tester.pumpAndSettle();
        },
        createHttpClient: (context) =>
            TestHttpOverrides().createHttpClient(context),
      );

      expect(find.text('Visa'), findsAtLeastNWidgets(1));
      expect(find.byIcon(Icons.keyboard_arrow_down), findsOneWidget);
    });

    testWidgets('should render nothing if payments are empty', (tester) async {
      await HttpOverrides.runZoned(
        () async {
          await tester.pumpWidget(
            createWidget(
              child: BrandSelectorView(
                payments: [],
                selectedId: null,
                onSelect: (_) {},
              ),
            ),
          );
          await tester.pumpAndSettle();
        },
        createHttpClient: (context) =>
            TestHttpOverrides().createHttpClient(context),
      );

      expect(find.byType(Button), findsNothing);
    });

    testWidgets('should open bottom sheet and select payment', (tester) async {
      final payments = [
        PaymentFaker.fakeDto(name: 'Visa', id: '1'),
        PaymentFaker.fakeDto(name: 'Mastercard', id: '2'),
      ];
      String? selectedId;

      await HttpOverrides.runZoned(
        () async {
          await tester.pumpWidget(
            createWidget(
              child: Center(
                child: BrandSelectorView(
                  payments: payments,
                  selectedId: '1',
                  onSelect: (id) => selectedId = id,
                ),
              ),
            ),
          );
          await tester.pumpAndSettle();

          // Tap the button to open bottom sheet
          await tester.tap(find.byType(BrandSelectorView));
          await tester.pumpAndSettle();

          // Check if bottom sheet content is displayed
          expect(find.text('Mastercard'), findsOneWidget);
          expect(find.text('Visa'), findsAtLeastNWidgets(1));

          // Select Mastercard
          await tester.tap(find.text('Mastercard'));
          await tester.pumpAndSettle();
        },
        createHttpClient: (context) =>
            TestHttpOverrides().createHttpClient(context),
      );

      expect(selectedId, '2');
    });
  });
}
