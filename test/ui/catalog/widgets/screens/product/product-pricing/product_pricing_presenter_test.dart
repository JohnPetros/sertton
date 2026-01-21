import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-pricing/product_pricing_presenter.dart';

void main() {
  group('ProductPricingPresenter', () {
    test(
      'should identify discount when current price is lower than original',
      () {
        final presenter = ProductPricingPresenter(
          originalPrice: 100.0,
          currentPrice: 80.0,
        );
        expect(presenter.hasDiscount.value, isTrue);
      },
    );

    test('should NOT identify discount when prices are equal', () {
      final presenter = ProductPricingPresenter(
        originalPrice: 100.0,
        currentPrice: 100.0,
      );
      expect(presenter.hasDiscount.value, isFalse);
    });

    test('should format prices in BRL currency', () {
      final presenter = ProductPricingPresenter(
        originalPrice: 1234.56,
        currentPrice: 1000.0,
      );
      // Note: Depending on environment, symbol might be R$ or R$ followed by non-breaking space
      expect(presenter.formattedOriginalPrice.value, contains('1.234,56'));
      expect(presenter.formattedOriginalPrice.value, contains('R\$'));
      expect(presenter.formattedCurrentPrice.value, contains('1.000,00'));
      expect(presenter.formattedCurrentPrice.value, contains('R\$'));
    });
  });
}
