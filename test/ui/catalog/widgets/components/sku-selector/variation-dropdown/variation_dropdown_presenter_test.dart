import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/variation-dropdown/variation_dropdown_presenter.dart';

void main() {
  group('VariationDropdownPresenter', () {
    test('should initialize with initial value', () {
      final presenter = VariationDropdownPresenter(
        label: 'Tamanho',
        options: ['P', 'M', 'G'],
        initialSelectedValue: 'M',
        onSelect: (_) {},
      );
      expect(presenter.internalSelectedValue.value, 'M');
      expect(presenter.displayValue.value, 'M');
      expect(presenter.hasSelection.value, isTrue);
    });

    test('should show default text when no initial value', () {
      final presenter = VariationDropdownPresenter(
        label: 'Tamanho',
        options: ['P', 'M', 'G'],
        initialSelectedValue: null,
        onSelect: (_) {},
      );
      expect(presenter.internalSelectedValue.value, isNull);
      expect(presenter.displayValue.value, 'Selecionar');
      expect(presenter.hasSelection.value, isFalse);
    });

    test('selectOption should update selected value and call callback', () {
      String? selected;
      final presenter = VariationDropdownPresenter(
        label: 'Tamanho',
        options: ['P', 'M', 'G'],
        initialSelectedValue: null,
        onSelect: (val) => selected = val,
      );

      presenter.selectOption('G');
      expect(presenter.internalSelectedValue.value, 'G');
      expect(selected, 'G');
      expect(presenter.displayValue.value, 'G');
    });
  });
}
