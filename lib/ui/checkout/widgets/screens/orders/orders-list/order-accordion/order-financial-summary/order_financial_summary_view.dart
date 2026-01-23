import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/core/checkout/dtos/order_item_dto.dart';

class OrderFinancialSummaryView extends StatelessWidget {
  final List<OrderItemDto> items;
  final double shippingPrice;

  const OrderFinancialSummaryView({
    super.key,
    required this.items,
    required this.shippingPrice,
  });

  @override
  Widget build(BuildContext context) {
    const brandBlue = Color(0xFF46A6D2);
    const brandGreen = Color(0xFF27AE60);

    final productsTotal = items.fold<double>(
      0,
      (sum, item) => sum + (item.price * item.quantity),
    );

    // Summing up discounts based on the image logic where item shows sale price vs discount price
    final totalDiscount = items.fold<double>(
      0,
      (sum, item) =>
          sum + ((item.skuSalePrice - item.skuDiscountPrice) * item.quantity),
    );

    final total = productsTotal + shippingPrice;

    String formatPrice(double price) =>
        'R\$ ${price.toStringAsFixed(2).replaceFirst('.', ',')}';

    return Column(
      children: [
        const Divider(),
        const SizedBox(height: 12),
        _buildRow(context, 'Produtos ( item)', formatPrice(productsTotal)),
        const SizedBox(height: 8),
        _buildRow(context, 'Frete', formatPrice(shippingPrice)),
        if (totalDiscount > 0) ...[
          const SizedBox(height: 8),
          _buildRow(
            context,
            'Desconto',
            '- ${formatPrice(totalDiscount)}',
            valueColor: brandGreen,
          ),
        ],
        const SizedBox(height: 16),
        _buildRow(
          context,
          'Total',
          formatPrice(total),
          isTotal: true,
          valueColor: brandBlue,
        ),
      ],
    );
  }

  Widget _buildRow(
    BuildContext context,
    String label,
    String value, {
    bool isTotal = false,
    Color? valueColor,
  }) {
    final theme = Theme.of(context);

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: isTotal
              ? theme.typography.base.copyWith(fontWeight: FontWeight.bold)
              : theme.typography.small.copyWith(
                  color: theme.colorScheme.mutedForeground,
                ),
        ),
        Text(
          value,
          style: isTotal
              ? theme.typography.h4.copyWith(
                  fontWeight: FontWeight.bold,
                  color: valueColor,
                )
              : theme.typography.small.copyWith(
                  fontWeight: FontWeight.bold,
                  color: valueColor,
                ),
        ),
      ],
    );
  }
}
