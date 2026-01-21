import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:signals/signals.dart';

class SkuSelectorPresenter {
  final List<SkuDto> skus;
  final String variationLabel;
  final void Function(SkuDto) onSkuSelected;
  final void Function(int) onQuantityChanged;

  final selectedSku = signal<SkuDto?>(null);
  final quantity = signal<int>(1);

  late final activeSku = computed(() => selectedSku.value ?? skus.first);

  late final maxQuantity = computed(() => activeSku.value.stock);

  late final canIncrement = computed(() => quantity.value < maxQuantity.value);

  late final canDecrement = computed(() => quantity.value > 1);

  late final isOutOfStock = computed(() => activeSku.value.stock <= 0);

  late final hasSelection = computed(() => selectedSku.value != null);

  late final variationOptions = computed(() {
    return skus
        .map((sku) => _getVariationValue(sku))
        .where((value) => value.isNotEmpty)
        .toSet()
        .toList();
  });

  SkuSelectorPresenter({
    required this.skus,
    required this.variationLabel,
    required this.onSkuSelected,
    required this.onQuantityChanged,
    SkuDto? initialSku,
  }) {
    selectedSku.value = initialSku ?? (skus.isNotEmpty ? skus.first : null);
  }

  void selectSkuByVariation(String variationValue) {
    try {
      final sku = skus.firstWhere(
        (sku) => _getVariationValue(sku) == variationValue,
      );
      selectedSku.value = sku;
      quantity.value = 1; // Reset quantity when changing SKU
      onSkuSelected(sku);
      onQuantityChanged(1);
    } catch (e) {
      // SKU not found, keep current selection
    }
  }

  void incrementQuantity() {
    if (canIncrement.value) {
      quantity.value++;
      onQuantityChanged(quantity.value);
    }
  }

  void decrementQuantity() {
    if (canDecrement.value) {
      quantity.value--;
      onQuantityChanged(quantity.value);
    }
  }

  void setQuantity(int value) {
    final clampedValue = value.clamp(1, maxQuantity.value);
    quantity.value = clampedValue;
    onQuantityChanged(quantity.value);
  }

  String _getVariationValue(SkuDto sku) {
    try {
      final variation = sku.variations.firstWhere(
        (v) => v.name.toLowerCase() == variationLabel.toLowerCase(),
      );
      return variation.value;
    } catch (e) {
      return '';
    }
  }

  String? get selectedVariationValue {
    if (selectedSku.value == null) return null;
    return _getVariationValue(selectedSku.value!);
  }
}

final skuSelectorPresenterProvider = Provider.autoDispose
    .family<
      SkuSelectorPresenter,
      ({
        List<SkuDto> skus,
        String variationLabel,
        void Function(SkuDto) onSkuSelected,
        void Function(int) onQuantityChanged,
        SkuDto? initialSku,
      })
    >((ref, props) {
      return SkuSelectorPresenter(
        skus: props.skus,
        variationLabel: props.variationLabel,
        onSkuSelected: props.onSkuSelected,
        onQuantityChanged: props.onQuantityChanged,
        initialSku: props.initialSku,
      );
    });
