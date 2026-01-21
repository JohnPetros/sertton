import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-header/product_header_presenter.dart';

void main() {
  late ProductHeaderPresenter presenter;
  const skuCode = '12345';
  const title = 'Product Title';

  setUp(() {
    presenter = ProductHeaderPresenter(skuCode: skuCode, title: title);
  });

  group('ProductHeaderPresenter', () {
    test('should format SKU code correctly', () {
      expect(presenter.formattedSkuCode.value, 'SKU: 12345');
    });

    test('should keep original values', () {
      expect(presenter.skuCode, skuCode);
      expect(presenter.title, title);
    });
  });
}
