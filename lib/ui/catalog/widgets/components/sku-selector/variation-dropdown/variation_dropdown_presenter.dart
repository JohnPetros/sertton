import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class VariationDropdownPresenter {
  final String label;
  final List<String> options;
  final String? initialSelectedValue;
  final void Function(String) onSelect;

  final internalSelectedValue = signal<String?>(null);

  late final displayValue = computed(
    () => internalSelectedValue.value ?? 'Selecionar',
  );

  late final hasSelection = computed(() => internalSelectedValue.value != null);

  VariationDropdownPresenter({
    required this.label,
    required this.options,
    required this.initialSelectedValue,
    required this.onSelect,
  }) {
    internalSelectedValue.value = initialSelectedValue;
  }

  void selectOption(String value) {
    internalSelectedValue.value = value;
    onSelect(value);
  }
}

final variationDropdownPresenterProvider = Provider.autoDispose
    .family<
      VariationDropdownPresenter,
      ({
        String label,
        List<String> options,
        String? selectedValue,
        void Function(String) onSelect,
      })
    >((ref, props) {
      return VariationDropdownPresenter(
        label: props.label,
        options: props.options,
        initialSelectedValue: props.selectedValue,
        onSelect: props.onSelect,
      );
    });
