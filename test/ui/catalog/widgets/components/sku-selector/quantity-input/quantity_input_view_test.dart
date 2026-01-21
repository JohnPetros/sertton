import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/quantity-input/index.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/quantity-input/quantity_input_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MockQuantityInputPresenter extends Mock
    implements QuantityInputPresenter {}

void main() {
  late MockQuantityInputPresenter presenter;

  setUp(() {
    presenter = MockQuantityInputPresenter();
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          quantityInputPresenterProvider.overrideWith(
            (ref, props) => presenter,
          ),
        ],
        child: QuantityInput(
          initialQuantity: 1,
          maxQuantity: 10,
          onQuantityChanged: (_) {},
        ),
      ),
    );
  }

  group('QuantityInputView', () {
    testWidgets('should render quantity and enable/disable buttons', (
      tester,
    ) async {
      when(() => presenter.displayQuantity).thenReturn(computed(() => '5'));
      when(() => presenter.canIncrement).thenReturn(computed(() => true));
      when(() => presenter.canDecrement).thenReturn(computed(() => true));

      await tester.pumpWidget(createWidget());
      await tester.pump();

      expect(find.text('5'), findsOneWidget);
    });

    testWidgets('should call increment when plus button is tapped', (
      tester,
    ) async {
      when(() => presenter.displayQuantity).thenReturn(computed(() => '1'));
      when(() => presenter.canIncrement).thenReturn(computed(() => true));
      when(() => presenter.canDecrement).thenReturn(computed(() => false));
      when(() => presenter.increment()).thenAnswer((_) {});

      await tester.pumpWidget(createWidget());
      await tester.pump();

      await tester.tap(find.byIcon(Icons.add));
      verify(() => presenter.increment()).called(1);
    });
  });
}
