import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/add_to_cart_button_presenter.dart';

abstract class Callable {
  void call();
}

class MockCallback extends Mock implements Callable {}

void main() {
  group('AddToCartButtonPresenter', () {
    late MockCallback mockOnAddToCart;
    late AddToCartButtonPresenter presenter;

    setUp(() {
      mockOnAddToCart = MockCallback();
      presenter = AddToCartButtonPresenter(mockOnAddToCart.call);
    });

    test('should have initial state loading false', () {
      expect(presenter.isLoading.value, isFalse);
    });

    test(
      'should call onAddToCart and update loading state when handlePress is called',
      () async {
        when(() => mockOnAddToCart()).thenReturn(null);

        final future = presenter.handlePress();

        expect(presenter.isLoading.value, isTrue);

        await future;

        verify(() => mockOnAddToCart()).called(1);
        expect(presenter.isLoading.value, isFalse);
      },
    );

    test('should not call onAddToCart if already loading', () async {
      presenter.isLoading.value = true;

      await presenter.handlePress();

      verifyNever(() => mockOnAddToCart());
    });
  });
}
