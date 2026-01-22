import 'package:shadcn_flutter/shadcn_flutter.dart';

import 'package:sertton/ui/global/widgets/quantity-input/quantity_input_view.dart';

class CartItemCardView extends StatelessWidget {
  final String imageUrl;
  final String skuCode;
  final String name;
  final String variationName;
  final String variationValue;
  final double salePrice;
  final double discountPrice;
  final int quantity;
  final int maxQuantity;
  final Function(int) onQuantityChanged;
  final VoidCallback onRemove;

  const CartItemCardView({
    super.key,
    required this.imageUrl,
    required this.skuCode,
    required this.name,
    required this.variationName,
    required this.variationValue,
    required this.salePrice,
    required this.discountPrice,
    required this.quantity,
    required this.maxQuantity,
    required this.onQuantityChanged,
    required this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = const Color(0xFF2D9CDB);
    final grayColor = const Color(0xFF828282);

    return Card(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Product Image
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.network(
              imageUrl,
              width: 100,
              height: 100,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  width: 100,
                  height: 100,
                  color: theme.colorScheme.muted,
                  child: const Icon(LucideIcons.image),
                );
              },
            ),
          ),
          const SizedBox(width: 16),

          // Product Details
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // SKU Code
                Text(
                  'SKU: $skuCode',
                  style: theme.typography.small.copyWith(
                    color: primaryColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 4),

                // Product Name
                Text(
                  name,
                  style: theme.typography.p.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),

                // Variation
                if (variationName.isNotEmpty && variationValue.isNotEmpty)
                  Text(
                    '• $variationName: $variationValue',
                    style: theme.typography.small.copyWith(color: grayColor),
                  ),
                const SizedBox(height: 12),

                // Quantity Input
                QuantityInputView(
                  initialQuantity: quantity,
                  maxQuantity: maxQuantity,
                  onQuantityChanged: onQuantityChanged,
                ),
                const SizedBox(height: 8),

                // Prices and Remove Button
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Original Price (strikethrough)
                        if (salePrice > discountPrice)
                          Text(
                            'R\$ ${salePrice.toStringAsFixed(2)}',
                            style: theme.typography.small.copyWith(
                              color: grayColor,
                              decoration: TextDecoration.lineThrough,
                            ),
                          ),
                        // Discount Price
                        Text(
                          'R\$ ${discountPrice.toStringAsFixed(2)}',
                          style: theme.typography.h3.copyWith(
                            color: primaryColor,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),

                    // Remove Button
                    IconButton.ghost(
                      icon: Icon(LucideIcons.trash2, color: grayColor),
                      onPressed: onRemove,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
