import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/product_image_presenter.dart';

void main() {
  group('ProductImagePresenter', () {
    late ProductImagePresenter presenter;

    setUp(() {
      presenter = ProductImagePresenter('https://example.com/image.jpg');
    });

    test(
      'should have initial state with isLoading true and hasError false',
      () {
        expect(presenter.isLoading.value, isTrue);
        expect(presenter.hasError.value, isFalse);
      },
    );

    test('should set isLoading to false when onLoadComplete is called', () {
      presenter.onLoadComplete();

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.hasError.value, isFalse);
    });

    test(
      'should set hasError to true and isLoading to false when onLoadError is called',
      () {
        presenter.onLoadError();

        expect(presenter.isLoading.value, isFalse);
        expect(presenter.hasError.value, isTrue);
      },
    );
  });
}
