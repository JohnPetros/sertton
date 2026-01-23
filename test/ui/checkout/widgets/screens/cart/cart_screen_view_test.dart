import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/cart/cart_screen_view.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart';

class MockCartScreenPresenter extends Mock implements CartScreenPresenter {}

void main() {
  late MockCartScreenPresenter presenter;

  setUp(() {
    presenter = MockCartScreenPresenter();

    when(() => presenter.isLoading).thenReturn(signal(false));
    when(() => presenter.hasError).thenReturn(signal(false));
    when(() => presenter.cartDisplayItems).thenReturn(signal([]));
    when(() => presenter.itemCount).thenReturn(computed(() => 0));
    when(() => presenter.subtotal).thenReturn(computed(() => 0.0));
    when(() => presenter.totalDiscount).thenReturn(computed(() => 0.0));
    when(() => presenter.total).thenReturn(computed(() => 0.0));
    when(() => presenter.isEmpty).thenReturn(computed(() => true));
    when(() => presenter.canCheckout).thenReturn(computed(() => false));
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [cartScreenPresenterProvider.overrideWithValue(presenter)],
        child: const CartScreenView(),
      ),
    );
  }

  group('CartScreenView', () {
    testWidgets('should render loading state when isLoading is true', (
      tester,
    ) async {
      when(() => presenter.isLoading).thenReturn(signal(true));

      await tester.pumpWidget(createWidget());

      expect(find.byType(CartScreenView), findsOneWidget);
    });

    testWidgets('should render empty state when cart is empty', (tester) async {
      when(() => presenter.isEmpty).thenReturn(computed(() => true));
      when(() => presenter.isLoading).thenReturn(signal(false));

      await tester.pumpWidget(createWidget());

      expect(find.text('Seu carrinho está vazio'), findsOneWidget);
    });

    testWidgets('should render error state when hasError is true', (
      tester,
    ) async {
      when(() => presenter.hasError).thenReturn(signal(true));
      when(() => presenter.isLoading).thenReturn(signal(false));

      await tester.pumpWidget(createWidget());

      expect(find.text('Erro ao carregar o carrinho'), findsOneWidget);
    });

    testWidgets('should render cart items when they exist', (tester) async {
      final items = [
        CartDisplayItem(
          skuId: 'sku1',
          name: 'Product 1',
          imageUrl: '',
          skuCode: 'SKU1',
          variationName: 'Color',
          variationValue: 'Red',
          salePrice: 100,
          discountPrice: 80,
          quantity: 2,
          maxQuantity: 10,
          yampiToken: 'token1',
        ),
      ];

      when(() => presenter.cartDisplayItems).thenReturn(signal(items));
      when(() => presenter.isEmpty).thenReturn(computed(() => false));
      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.itemCount).thenReturn(computed(() => 2));
      when(() => presenter.subtotal).thenReturn(computed(() => 200.0));
      when(() => presenter.totalDiscount).thenReturn(computed(() => 40.0));
      when(() => presenter.total).thenReturn(computed(() => 160.0));
      when(() => presenter.canCheckout).thenReturn(computed(() => true));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
        await tester.pumpAndSettle();

        expect(find.text('Product 1'), findsOneWidget);
        expect(find.text('• Color: Red'), findsOneWidget);
        expect(find.text('Produtos (2 items)'), findsOneWidget);
        expect(find.text('Finalizar compra'), findsOneWidget);
      });
    });

    testWidgets('should call checkout when checkout button is pressed', (
      tester,
    ) async {
      final items = [
        CartDisplayItem(
          skuId: 'sku1',
          name: 'Product 1',
          imageUrl: '',
          skuCode: 'SKU1',
          variationName: '',
          variationValue: '',
          salePrice: 100,
          discountPrice: 80,
          quantity: 1,
          maxQuantity: 10,
          yampiToken: 'token1',
        ),
      ];

      when(() => presenter.cartDisplayItems).thenReturn(signal(items));
      when(() => presenter.isEmpty).thenReturn(computed(() => false));
      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.canCheckout).thenReturn(computed(() => true));
      when(() => presenter.itemCount).thenReturn(computed(() => 1));
      when(() => presenter.subtotal).thenReturn(computed(() => 100.0));
      when(() => presenter.totalDiscount).thenReturn(computed(() => 20.0));
      when(() => presenter.total).thenReturn(computed(() => 80.0));
      when(() => presenter.checkout()).thenAnswer((_) async {});

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
        await tester.pumpAndSettle();

        final checkoutButton = find.text('Finalizar compra');
        await tester.tap(checkoutButton);
        await tester.pump();

        verify(() => presenter.checkout()).called(1);
      });
    });
  });
}
