import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/variation-dropdown/index.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/variation-dropdown/variation_dropdown_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MockVariationDropdownPresenter extends Mock
    implements VariationDropdownPresenter {}

void main() {
  late MockVariationDropdownPresenter presenter;
  const label = 'Cor';
  final options = ['Azul', 'Vermelho', 'Verde'];

  setUp(() {
    presenter = MockVariationDropdownPresenter();
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          variationDropdownPresenterProvider.overrideWith(
            (ref, props) => presenter,
          ),
        ],
        child: VariationDropdown(
          label: label,
          options: options,
          selectedValue: null,
          onSelect: (_) {},
        ),
      ),
    );
  }

  group('VariationDropdownView', () {
    testWidgets('should render label and display value', (tester) async {
      when(
        () => presenter.displayValue,
      ).thenReturn(computed(() => 'Selecionar'));
      when(() => presenter.hasSelection).thenReturn(computed(() => false));
      when(() => presenter.internalSelectedValue).thenReturn(signal(null));

      await tester.pumpWidget(createWidget());
      await tester.pump();

      expect(find.text(label), findsOneWidget);
    });
  });
}
