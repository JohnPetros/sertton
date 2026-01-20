import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' hide Theme, Scaffold;
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/product_info_presenter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/product_info_view.dart';

class MockProductInfoPresenter extends Mock implements ProductInfoPresenter {}

void main() {
  group('ProductInfoView', () {
    late MockProductInfoPresenter presenter;

    setUp(() {
      presenter = MockProductInfoPresenter();

      when(
        () => presenter.displayPrice,
      ).thenReturn(computed(() => 'R\$ 100,00'));
      when(
        () => presenter.formattedSalePrice,
      ).thenReturn(computed(() => 'R\$ 120,00'));
      when(() => presenter.hasDiscount).thenReturn(computed(() => false));
    });

    Widget createWidget() {
      return ShadcnApp(
        home: ProviderScope(
          overrides: [
            productInfoPresenterProvider.overrideWith((ref, _) => presenter),
          ],
          child: const Scaffold(
            body: ProductInfoView(
              skuCode: 'SKU123',
              brandName: 'BrandX',
              productName: 'Product Name',
              salePrice: 120.0,
              discountPrice: 100.0,
            ),
          ),
        ),
      );
    }

    testWidgets('should display SKU, Brand, and Product Name', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('SKU: SKU123'), findsOneWidget);
      expect(find.text('BRANDX'), findsOneWidget); // Uppercase in view
      expect(find.text('Product Name'), findsOneWidget);
    });

    testWidgets('should only display displayPrice when no discount', (
      tester,
    ) async {
      when(() => presenter.hasDiscount).thenReturn(computed(() => false));
      when(
        () => presenter.displayPrice,
      ).thenReturn(computed(() => 'R\$ 120,00'));

      await tester.pumpWidget(createWidget());

      expect(find.text('R\$ 120,00'), findsOneWidget);
      expect(find.text('R\$ 100,00'), findsNothing);
    });

    testWidgets(
      'should display original price struck-through when has discount',
      (tester) async {
        when(() => presenter.hasDiscount).thenReturn(computed(() => true));
        when(
          () => presenter.displayPrice,
        ).thenReturn(computed(() => 'R\$ 80,00'));
        when(
          () => presenter.formattedSalePrice,
        ).thenReturn(computed(() => 'R\$ 100,00'));

        await tester.pumpWidget(createWidget());

        expect(find.text('R\$ 80,00'), findsOneWidget); // Discount price
        expect(find.text('R\$ 100,00'), findsOneWidget); // Original price

        // Verify strikethrough decoration
        final originalPriceText = tester.widget<Text>(find.text('R\$ 100,00'));
        expect(originalPriceText.style?.decoration, TextDecoration.lineThrough);
      },
    );
  });
}
