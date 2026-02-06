import 'package:sertton/ui/catalog/widgets/components/sku-selector/quantity-input/index.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/variation-dropdown/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class SkuSelectorView extends StatelessWidget {
  final String variationLabel;
  final List<String> variationOptions;
  final String? selectedVariationValue;
  final int quantity;
  final int maxQuantity;
  final void Function(String) onVariationSelected;
  final void Function(int) onQuantityChanged;

  const SkuSelectorView({
    super.key,
    required this.variationLabel,
    required this.variationOptions,
    required this.selectedVariationValue,
    required this.quantity,
    required this.maxQuantity,
    required this.onVariationSelected,
    required this.onQuantityChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (variationOptions.length > 1) ...[
          VariationDropdown(
            label: variationLabel,
            options: variationOptions,
            selectedValue: selectedVariationValue,
            onSelect: onVariationSelected,
          ),
          const SizedBox(height: 16),
        ],
        Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              QuantityInput(
                initialQuantity: quantity,
                maxQuantity: maxQuantity,
                onQuantityChanged: onQuantityChanged,
              ),
              const SizedBox(height: 8),
              if (maxQuantity == 0)
                Text(
                  'Produto sem estoque.',
                  style: theme.typography.xSmall.copyWith(
                    color: theme.colorScheme.destructive,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              Text(
                maxQuantity > 0
                    ? 'Disponível: $maxQuantity unidades'
                    : 'Indisponível no momento.',
                style: theme.typography.xSmall.copyWith(
                  color: maxQuantity > 0
                      ? theme.colorScheme.mutedForeground
                      : theme.colorScheme.destructive,
                  fontWeight: maxQuantity > 0 ? null : FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
