import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:signals/signals_flutter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/ui/checkout/widgets/components/cart-dialog/cart_dialog_view.dart';
import 'package:sertton/ui/checkout/widgets/components/cart-dialog/cart_dialog_presenter.dart';
import '../../../../../fakers/product_faker.dart';

class MockCartDialogPresenter extends Mock implements CartDialogPresenter {}

void main() {
  late MockCartDialogPresenter presenter;
  late ProductDto product;
  late bool onCloseCalled;

  setUp(() {
    presenter = MockCartDialogPresenter();
    product = ProductFaker.fakeDto(name: 'Test Product', skus: []);
    onCloseCalled = false;

    // Default mock stubs for signals
    when(() => presenter.quantity).thenReturn(signal(1));
    when(() => presenter.isSubmitting).thenReturn(signal(false));
    when(() => presenter.variationOptions).thenReturn([]);
    when(
      () => presenter.selectedVariationValue,
    ).thenReturn(computed(() => null));
    when(() => presenter.maxQuantity).thenReturn(computed(() => 10));
    when(() => presenter.isOutOfStock).thenReturn(computed(() => false));
    when(() => presenter.isInCart).thenReturn(computed(() => false));
    when(() => presenter.cartQuantity).thenReturn(computed(() => 0));
    when(() => presenter.canAdd).thenReturn(computed(() => true));
  });

  Widget createWidget() {
    return shadcn.ShadcnApp(
      home: ProviderScope(
        overrides: [
          cartDialogPresenterProvider(product).overrideWithValue(presenter),
        ],
        child: CartDialogView(
          product: product,
          onClose: () => onCloseCalled = true,
        ),
      ),
    );
  }

  group('CartDialogView', () {
    testWidgets('should render product name and buttons', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Test Product'), findsOneWidget);
      expect(find.text('Cancelar'), findsOneWidget);
      expect(find.text('Adicionar'), findsOneWidget);
    });

    testWidgets('should call onClose when Cancelar is pressed', (tester) async {
      await tester.pumpWidget(createWidget());

      await tester.tap(find.text('Cancelar'));
      expect(onCloseCalled, isTrue);
    });

    testWidgets('should call addToCart when Adicionar is pressed', (
      tester,
    ) async {
      when(() => presenter.addToCart()).thenAnswer((_) async {});

      await tester.pumpWidget(createWidget());

      await tester.tap(find.text('Adicionar'));
      verify(() => presenter.addToCart()).called(1);
    });

    testWidgets('should show Indisponível when out of stock', (tester) async {
      when(() => presenter.isOutOfStock).thenReturn(computed(() => true));
      when(() => presenter.canAdd).thenReturn(computed(() => false));

      await tester.pumpWidget(createWidget());

      expect(find.text('Indisponível'), findsOneWidget);

      await tester.tap(find.text('Indisponível'));
      verifyNever(() => presenter.addToCart());
    });

    testWidgets('should show loading state when submitting', (tester) async {
      when(() => presenter.isSubmitting).thenReturn(signal(true));
      when(() => presenter.canAdd).thenReturn(computed(() => false));

      await tester.pumpWidget(createWidget());

      expect(find.byType(shadcn.CircularProgressIndicator), findsOneWidget);
    });
  });
}
