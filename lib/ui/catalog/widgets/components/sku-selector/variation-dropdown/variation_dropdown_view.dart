import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/variation-dropdown/variation_dropdown_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class VariationDropdownView extends ConsumerWidget {
  final String label;
  final List<String> options;
  final String? selectedValue;
  final void Function(String) onSelect;

  const VariationDropdownView({
    super.key,
    required this.label,
    required this.options,
    required this.selectedValue,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      variationDropdownPresenterProvider((
        label: label,
        options: options,
        selectedValue: selectedValue,
        onSelect: onSelect,
      )),
    );

    final theme = Theme.of(context);

    return Watch((context) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
            child: Text(
              label,
              style: theme.typography.small.copyWith(
                color: theme.colorScheme.mutedForeground,
                fontWeight: FontWeight.w600,
                letterSpacing: 1.2,
              ),
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: Select<String>(
              placeholder: const Text('Selecione'),
              value: presenter.internalSelectedValue.value,
              onChanged: (value) {
                if (value != null) {
                  presenter.selectOption(value);
                }
              },
              itemBuilder: (context, item) => Center(
                child: Text(
                  item,
                  style: theme.typography.small.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              popup: (context) {
                return ConstrainedBox(
                  constraints: BoxConstraints(
                    maxHeight: MediaQuery.of(context).size.height * 0.7,
                    minWidth: MediaQuery.of(context).size.width,
                  ),
                  child: Container(
                    padding: const EdgeInsets.only(top: 12, bottom: 24),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.background,
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(24),
                      ),
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Handle bar
                        Container(
                          width: 40,
                          height: 4,
                          decoration: BoxDecoration(
                            color: theme.colorScheme.muted,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                        // Popup Title
                        Text(
                          'Selecione o $label',
                          style: theme.typography.small.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Flexible(
                          child: SelectPopup(
                            items: SelectItemList(
                              children: options.map((option) {
                                final isSelected =
                                    presenter.internalSelectedValue.value ==
                                    option;
                                return SelectItemButton(
                                  value: option,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 4,
                                    ),
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          option,
                                          style: theme.typography.small
                                              .copyWith(
                                                color: isSelected
                                                    ? theme.colorScheme.primary
                                                    : theme
                                                          .colorScheme
                                                          .foreground,
                                                fontWeight: isSelected
                                                    ? FontWeight.w700
                                                    : FontWeight.w400,
                                              ),
                                        ),
                                      ],
                                    ),
                                  ),
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      );
    });
  }
}
