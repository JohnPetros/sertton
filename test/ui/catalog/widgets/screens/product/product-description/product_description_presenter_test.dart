import 'package:flutter_test/flutter_test.dart';
import '../../../../../../fakers/product_faker.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-description/product_description_presenter.dart';

void main() {
  group('ProductDescriptionPresenter', () {
    test('should initialize with product description and specifications', () {
      final product = ProductFaker.fakeDto(
        description: 'Test Description',
        specifications: 'Test Specs',
      );

      final presenter = ProductDescriptionPresenter(product: product);

      expect(presenter.description.value, 'Test Description');
      expect(presenter.specifications.value, 'Test Specs');
    });

    test('cleanHtml should remove basic tags', () {
      final product = ProductFaker.fakeDto();
      final presenter = ProductDescriptionPresenter(product: product);

      const html = '<p>Hello</p> <br/> <b>World</b>&nbsp;!';
      expect(presenter.cleanHtml(html), contains('Hello'));
      expect(presenter.cleanHtml(html), contains('World'));
      expect(presenter.cleanHtml(html), isNot(contains('<p>')));
      expect(presenter.cleanHtml(html), isNot(contains('&nbsp;')));
    });
  });
}
