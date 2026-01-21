import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/quantity-input/quantity_input_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;
import 'package:signals/signals_flutter.dart';

class QuantityInputView extends ConsumerWidget {
  final int initialQuantity;
  final int maxQuantity;
  final void Function(int) onQuantityChanged;

  const QuantityInputView({
    super.key,
    required this.initialQuantity,
    required this.maxQuantity,
    required this.onQuantityChanged,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      quantityInputPresenterProvider((
        initialQuantity: initialQuantity,
        maxQuantity: maxQuantity,
        onQuantityChanged: onQuantityChanged,
      )),
    );

    final theme = Theme.of(context);

    return Watch((context) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          shadcn.IconButton.primary(
            icon: const Icon(Icons.remove),
            onPressed: presenter.canDecrement.value
                ? presenter.decrement
                : null,
          ),
          Container(
            constraints: const BoxConstraints(minWidth: 48),
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Text(
              presenter.displayQuantity.value,
              textAlign: TextAlign.center,
              style: theme.textTheme.titleLarge,
            ),
          ),
          shadcn.IconButton.primary(
            icon: const Icon(Icons.add),
            onPressed: presenter.canIncrement.value
                ? presenter.increment
                : null,
          ),
        ],
      );
    });
  }
}
