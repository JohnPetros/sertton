import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart'
    hide Theme, CircularProgressIndicator, Scaffold;
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/add_to_cart_button_presenter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/add_to_cart_button_view.dart';

class MockAddToCartButtonPresenter extends Mock
    implements AddToCartButtonPresenter {}

class FakeBuildContext extends Fake implements BuildContext {}

void main() {
  group('AddToCartButtonView', () {
    late MockAddToCartButtonPresenter presenter;
    late void Function(BuildContext) onAddToCart;

    setUp(() {
      registerFallbackValue(FakeBuildContext());
      presenter = MockAddToCartButtonPresenter();
      onAddToCart = (_) {};

      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.handlePress(any())).thenAnswer((_) async {});
    });

    Widget createWidget() {
      return ShadcnApp(
        home: ProviderScope(
          overrides: [
            addToCartButtonPresenterProvider.overrideWith(
              (ref, _) => presenter,
            ),
          ],
          child: Scaffold(body: AddToCartButtonView(onAddToCart: onAddToCart)),
        ),
      );
    }

    testWidgets('should show shopping cart icon when not loading', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      expect(find.byIcon(Icons.shopping_cart), findsOneWidget);
      expect(find.byType(CircularProgressIndicator), findsNothing);
    });

    testWidgets('should show circular progress indicator when loading', (
      tester,
    ) async {
      when(() => presenter.isLoading).thenReturn(signal(true));

      await tester.pumpWidget(createWidget());

      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      expect(find.byIcon(Icons.shopping_cart), findsNothing);
    });

    testWidgets('should call handlePress when tapped', (tester) async {
      await tester.pumpWidget(createWidget());

      await tester.tap(find.byType(AddToCartButtonView));

      verify(() => presenter.handlePress(any())).called(1);
    });
  });
}
