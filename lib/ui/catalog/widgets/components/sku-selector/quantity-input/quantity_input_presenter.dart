import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class QuantityInputPresenter {
  final int initialQuantity;
  final int maxQuantity;
  final void Function(int) onQuantityChanged;

  final quantity = signal<int>(1);

  late final canIncrement = computed(() => quantity.value < maxQuantity);

  late final canDecrement = computed(() => quantity.value > 1);

  late final displayQuantity = computed(() => quantity.value.toString());

  QuantityInputPresenter({
    required this.initialQuantity,
    required this.maxQuantity,
    required this.onQuantityChanged,
  }) {
    quantity.value = initialQuantity;
  }

  void increment() {
    if (canIncrement.value) {
      quantity.value++;
      onQuantityChanged(quantity.value);
    }
  }

  void decrement() {
    if (canDecrement.value) {
      quantity.value--;
      onQuantityChanged(quantity.value);
    }
  }

  void setQuantity(int value) {
    final clampedValue = value.clamp(1, maxQuantity);
    quantity.value = clampedValue;
    onQuantityChanged(quantity.value);
  }
}

final quantityInputPresenterProvider = Provider.autoDispose
    .family<
      QuantityInputPresenter,
      ({
        int initialQuantity,
        int maxQuantity,
        void Function(int) onQuantityChanged,
      })
    >((ref, props) {
      return QuantityInputPresenter(
        initialQuantity: props.initialQuantity,
        maxQuantity: props.maxQuantity,
        onQuantityChanged: props.onQuantityChanged,
      );
    });
