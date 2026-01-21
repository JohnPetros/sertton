import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/catalog/widgets/components/discount-badge/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-pricing/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-pricing/product_pricing_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MockProductPricingPresenter extends Mock
    implements ProductPricingPresenter {}

void main() {
  late MockProductPricingPresenter presenter;

  setUp(() {
    presenter = MockProductPricingPresenter();
  });

  Widget createWidget({
    required double originalPrice,
    required double currentPrice,
  }) {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          productPricingPresenterProvider.overrideWith(
            (ref, props) => presenter,
          ),
        ],
        child: ProductPricing(
          originalPrice: originalPrice,
          currentPrice: currentPrice,
        ),
      ),
    );
  }

  group('ProductPricingView', () {
    testWidgets(
      'should show original price and discount badge when has discount',
      (tester) async {
        when(() => presenter.hasDiscount).thenReturn(computed(() => true));
        when(
          () => presenter.formattedOriginalPrice,
        ).thenReturn(computed(() => 'R\$ 100,00'));
        when(
          () => presenter.formattedCurrentPrice,
        ).thenReturn(computed(() => 'R\$ 80,00'));

        await tester.pumpWidget(
          createWidget(originalPrice: 100, currentPrice: 80),
        );
        await tester.pump();

        expect(find.text('R\$ 100,00'), findsOneWidget);
        expect(find.text('R\$ 80,00'), findsOneWidget);
        expect(find.byType(DiscountBadge), findsOneWidget);
      },
    );

    testWidgets('should only show current price when NO discount', (
      tester,
    ) async {
      when(() => presenter.hasDiscount).thenReturn(computed(() => false));
      when(
        () => presenter.formattedCurrentPrice,
      ).thenReturn(computed(() => 'R\$ 100,00'));

      await tester.pumpWidget(
        createWidget(originalPrice: 100, currentPrice: 100),
      );
      await tester.pump();

      expect(find.text('R\$ 100,00'), findsOneWidget);
      expect(find.byType(DiscountBadge), findsNothing);
    });
  });
}
