import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

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
    final theme = Theme.of(context);

    // Using a local signal that initializes with initialQuantity but doesn't reset on every rebuild
    // unless the initialQuantity actually changes from external sources (which it will if it's controlled).
    // To fix the "not increasing" bug caused by family key resets, we use a simple stateful approach or a stable presenter.
    // However, since this is a feature-component, we can just use the parent's callbacks directly.

    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        shadcn.IconButton.secondary(
          icon: const Icon(Icons.remove),
          onPressed: initialQuantity > 1
              ? () => onQuantityChanged(initialQuantity - 1)
              : null,
        ),
        Container(
          constraints: const BoxConstraints(minWidth: 48),
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            initialQuantity.toString(),
            textAlign: TextAlign.center,
            style: theme.textTheme.titleLarge,
          ),
        ),
        shadcn.IconButton.secondary(
          icon: const Icon(Icons.add),
          onPressed: initialQuantity < maxQuantity
              ? () => onQuantityChanged(initialQuantity + 1)
              : null,
        ),
      ],
    );
  }
}
