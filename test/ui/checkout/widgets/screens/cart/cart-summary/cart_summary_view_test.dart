import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/cart/cart-summary/cart_summary_view.dart';

void main() {
  Widget createWidget({
    required int itemCount,
    required double subtotal,
    required double discount,
    required double total,
    required VoidCallback onCheckout,
    bool isCheckoutEnabled = true,
  }) {
    return ShadcnApp(
      home: Scaffold(
        child: CartSummaryView(
          itemCount: itemCount,
          subtotal: subtotal,
          discount: discount,
          total: total,
          onCheckout: onCheckout,
          isCheckoutEnabled: isCheckoutEnabled,
        ),
      ),
    );
  }

  group('CartSummaryView', () {
    testWidgets('should render totals correctly', (tester) async {
      await tester.pumpWidget(
        createWidget(
          itemCount: 2,
          subtotal: 200.0,
          discount: 40.0,
          total: 160.0,
          onCheckout: () {},
        ),
      );

      expect(find.text('Produtos (2 items)'), findsOneWidget);
      expect(find.text('R\$ 200.00'), findsOneWidget);
      expect(find.text('Desconto'), findsOneWidget);
      expect(find.text('- R\$ 40.00'), findsOneWidget);
      expect(find.text('R\$ 160.00'), findsOneWidget);
      expect(find.text('Finalizar compra'), findsOneWidget);
    });

    testWidgets(
      'should disable checkout button when isCheckoutEnabled is false',
      (tester) async {
        await tester.pumpWidget(
          createWidget(
            itemCount: 0,
            subtotal: 0.0,
            discount: 0.0,
            total: 0.0,
            onCheckout: () {},
            isCheckoutEnabled: false,
          ),
        );

        final button = tester.widget<PrimaryButton>(
          find.ancestor(
            of: find.text('Finalizar compra'),
            matching: find.byType(PrimaryButton),
          ),
        );
        expect(button.onPressed, isNull);
      },
    );

    testWidgets('should call onCheckout when button is pressed and enabled', (
      tester,
    ) async {
      bool checkoutCalled = false;
      await tester.pumpWidget(
        createWidget(
          itemCount: 1,
          subtotal: 100.0,
          discount: 0.0,
          total: 100.0,
          onCheckout: () => checkoutCalled = true,
        ),
      );

      await tester.tap(find.text('Finalizar compra'));
      expect(checkoutCalled, isTrue);
    });
  });
}
