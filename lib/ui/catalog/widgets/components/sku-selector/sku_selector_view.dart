import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/quantity-input/index.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/sku_selector_presenter.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/variation-dropdown/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class SkuSelectorView extends ConsumerWidget {
  final List<SkuDto> skus;
  final String variationLabel;
  final void Function(SkuDto) onSkuSelected;
  final void Function(int) onQuantityChanged;

  final SkuDto? selectedSku;

  const SkuSelectorView({
    super.key,
    required this.skus,
    required this.variationLabel,
    required this.onSkuSelected,
    required this.onQuantityChanged,
    this.selectedSku,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      skuSelectorPresenterProvider((
        skus: skus,
        variationLabel: variationLabel,
        onSkuSelected: onSkuSelected,
        onQuantityChanged: onQuantityChanged,
        initialSku: selectedSku,
      )),
    );

    return Watch((context) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          VariationDropdown(
            label: variationLabel,
            options: presenter.variationOptions.value,
            selectedValue: presenter.selectedVariationValue,
            onSelect: presenter.selectSkuByVariation,
          ),
          const SizedBox(height: 16),
          QuantityInput(
            initialQuantity: presenter.quantity.value,
            maxQuantity: presenter.maxQuantity.value,
            onQuantityChanged: presenter.setQuantity,
          ),
        ],
      );
    });
  }
}
