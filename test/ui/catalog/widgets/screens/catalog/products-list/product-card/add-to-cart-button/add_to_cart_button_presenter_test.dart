import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/add_to_cart_button_presenter.dart';

abstract class Callable {
  void call(BuildContext context);
}

class MockCallback extends Mock implements Callable {}

class FakeBuildContext extends Fake implements BuildContext {}

void main() {
  group('AddToCartButtonPresenter', () {
    late MockCallback mockOnAddToCart;
    late AddToCartButtonPresenter presenter;
    late FakeBuildContext fakeContext;

    setUp(() {
      fakeContext = FakeBuildContext();
      registerFallbackValue(fakeContext);
      mockOnAddToCart = MockCallback();
      presenter = AddToCartButtonPresenter(mockOnAddToCart.call);
    });

    test('should have initial state loading false', () {
      expect(presenter.isLoading.value, isFalse);
    });

    test(
      'should call onAddToCart and update loading state when handlePress is called',
      () async {
        when(() => mockOnAddToCart(any())).thenReturn(null);

        final future = presenter.handlePress(fakeContext);

        expect(presenter.isLoading.value, isTrue);

        await future;

        verify(() => mockOnAddToCart(fakeContext)).called(1);
        expect(presenter.isLoading.value, isFalse);
      },
    );

    test('should not call onAddToCart if already loading', () async {
      presenter.isLoading.value = true;

      await presenter.handlePress(fakeContext);

      verifyNever(() => mockOnAddToCart(any()));
    });
  });
}
