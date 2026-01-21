import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import '../../../../../fakers/sku_faker.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/index.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/sku_selector_presenter.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/variation-dropdown/index.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/quantity-input/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MockSkuSelectorPresenter extends Mock implements SkuSelectorPresenter {}

void main() {
  late MockSkuSelectorPresenter presenter;
  final skus = SkuFaker.fakeManyDto(count: 2);
  const variationLabel = 'Cor';

  setUp(() {
    presenter = MockSkuSelectorPresenter();
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          skuSelectorPresenterProvider.overrideWith((ref, props) => presenter),
        ],
        child: SkuSelector(
          skus: skus,
          variationLabel: variationLabel,
          onSkuSelected: (_) {},
          onQuantityChanged: (_) {},
        ),
      ),
    );
  }

  group('SkuSelectorView', () {
    testWidgets('should render variation dropdown and quantity input', (
      tester,
    ) async {
      when(
        () => presenter.variationOptions,
      ).thenReturn(computed(() => ['Azul', 'Verde']));
      when(() => presenter.selectedVariationValue).thenReturn('Azul');
      when(() => presenter.quantity).thenReturn(signal(1));
      when(() => presenter.maxQuantity).thenReturn(computed(() => 10));

      await tester.pumpWidget(createWidget());
      await tester.pump();

      expect(find.byType(VariationDropdown), findsOneWidget);
      expect(find.byType(QuantityInput), findsOneWidget);
    });
  });
}
