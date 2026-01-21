import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/components/discount-badge/discount_badge_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' hide Theme;

void main() {
  Widget createWidgetUnderTest({
    required double salePrice,
    required double discountPrice,
  }) {
    return ProviderScope(
      child: ShadcnApp(
        theme: ThemeData(colorScheme: ColorSchemes.lightBlue, radius: 0.5),
        home: Scaffold(
          child: DiscountBadgeView(
            salePrice: salePrice,
            discountPrice: discountPrice,
          ),
        ),
      ),
    );
  }

  group('DiscountBadgeView', () {
    testWidgets(
      'should be visible and show correct percentage when discount exists',
      (tester) async {
        await tester.pumpWidget(
          createWidgetUnderTest(salePrice: 100.0, discountPrice: 80.0),
        );

        await tester.pumpAndSettle();

        expect(find.text('↓ 20 %'), findsOneWidget);
        expect(
          find.descendant(
            of: find.byType(DiscountBadgeView),
            matching: find.byType(Container),
          ),
          findsOneWidget,
        );
      },
    );

    testWidgets('should be hidden when no discount exists', (tester) async {
      await tester.pumpWidget(
        createWidgetUnderTest(salePrice: 100.0, discountPrice: 100.0),
      );

      await tester.pumpAndSettle();

      expect(find.textContaining('↓'), findsNothing);
      expect(
        find.descendant(
          of: find.byType(DiscountBadgeView),
          matching: find.byType(Container),
        ),
        findsNothing,
      );
    });

    testWidgets('should be hidden when price increases', (tester) async {
      await tester.pumpWidget(
        createWidgetUnderTest(salePrice: 100.0, discountPrice: 120.0),
      );

      await tester.pumpAndSettle();

      expect(find.textContaining('↓'), findsNothing);
      expect(
        find.descendant(
          of: find.byType(DiscountBadgeView),
          matching: find.byType(Container),
        ),
        findsNothing,
      );
    });

    testWidgets('should show rounded percentage', (tester) async {
      await tester.pumpWidget(
        createWidgetUnderTest(
          salePrice: 150.0,
          discountPrice: 100.0, // 33.33... %
        ),
      );

      await tester.pumpAndSettle();

      expect(find.text('↓ 33 %'), findsOneWidget);
    });
  });
}
