import 'package:shadcn_flutter/shadcn_flutter.dart';

class QuantityInputView extends StatelessWidget {
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
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton.secondary(
          icon: const Icon(LucideIcons.minus),
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
            style: theme.typography.large,
          ),
        ),
        IconButton.secondary(
          icon: const Icon(LucideIcons.plus),
          onPressed: initialQuantity < maxQuantity
              ? () => onQuantityChanged(initialQuantity + 1)
              : null,
        ),
      ],
    );
  }
}
