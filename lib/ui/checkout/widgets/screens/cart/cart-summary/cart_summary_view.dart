import 'package:shadcn_flutter/shadcn_flutter.dart';

class CartSummaryView extends StatelessWidget {
  final int itemCount;
  final double subtotal;
  final double discount;
  final double total;
  final VoidCallback onCheckout;
  final bool isCheckoutEnabled;

  const CartSummaryView({
    super.key,
    required this.itemCount,
    required this.subtotal,
    required this.discount,
    required this.total,
    required this.onCheckout,
    required this.isCheckoutEnabled,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final discountColor = const Color(0xFF27AE60);

    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.card,
        border: Border(
          top: BorderSide(color: theme.colorScheme.border, width: 1),
        ),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Subtotal
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Produtos ($itemCount ${itemCount == 1 ? 'item' : 'items'})',
                  style: const TextStyle(fontSize: 14),
                ),
                Text(
                  'R\$ ${subtotal.toStringAsFixed(2)}',
                  style: const TextStyle(fontSize: 14),
                ),
              ],
            ),
            const SizedBox(height: 8),

            // Discount
            if (discount > 0)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Desconto',
                    style: TextStyle(fontSize: 14, color: discountColor),
                  ),
                  Text(
                    '- R\$ ${discount.toStringAsFixed(2)}',
                    style: TextStyle(fontSize: 14, color: discountColor),
                  ),
                ],
              ),
            if (discount > 0) const SizedBox(height: 8),

            // Total
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Total',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                Text(
                  'R\$ ${total.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Checkout Button
            SizedBox(
              width: double.infinity,
              child: PrimaryButton(
                onPressed: isCheckoutEnabled ? onCheckout : null,
                child: const Text('Finalizar compra'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
