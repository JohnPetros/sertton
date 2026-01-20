import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/product_info_presenter.dart';

void main() {
  group('ProductInfoPresenter', () {
    test('should format salePrice correctly', () {
      final presenter = ProductInfoPresenter(
        skuCode: 'SKU123',
        brandName: 'Brand',
        productName: 'Product',
        salePrice: 100.0,
        discountPrice: 100.0,
      );

      expect(presenter.formattedSalePrice.value, 'R\$ 100,00');
    });

    test(
      'should indicate hasDiscount when discountPrice is less than salePrice',
      () {
        final presenter = ProductInfoPresenter(
          skuCode: 'SKU123',
          brandName: 'Brand',
          productName: 'Product',
          salePrice: 100.0,
          discountPrice: 80.0,
        );

        expect(presenter.hasDiscount.value, isTrue);
        expect(presenter.formattedDiscountPrice.value, 'R\$ 80,00');
      },
    );

    test('should not indicate hasDiscount when prices are equal', () {
      final presenter = ProductInfoPresenter(
        skuCode: 'SKU123',
        brandName: 'Brand',
        productName: 'Product',
        salePrice: 100.0,
        discountPrice: 100.0,
      );

      expect(presenter.hasDiscount.value, isFalse);
    });

    test('should display discount price when hasDiscount is true', () {
      final presenter = ProductInfoPresenter(
        skuCode: 'SKU123',
        brandName: 'Brand',
        productName: 'Product',
        salePrice: 100.0,
        discountPrice: 80.0,
      );

      expect(presenter.displayPrice.value, 'R\$ 80,00');
    });

    test('should display sale price when hasDiscount is false', () {
      final presenter = ProductInfoPresenter(
        skuCode: 'SKU123',
        brandName: 'Brand',
        productName: 'Product',
        salePrice: 100.0,
        discountPrice: 100.0,
      );

      expect(presenter.displayPrice.value, 'R\$ 100,00');
    });
  });
}
