import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/core/checkout/dtos/order_item_dto.dart';

class OrderProductsSectionView extends StatelessWidget {
  final List<OrderItemDto> items;

  const OrderProductsSectionView({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'PRODUTOS',
          style: theme.typography.small.copyWith(
            color: theme.colorScheme.mutedForeground,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        ...items.map((item) => _buildProductItem(context, item)),
      ],
    );
  }

  Widget _buildProductItem(BuildContext context, OrderItemDto item) {
    final theme = Theme.of(context);
    const brandBlue = Color(0xFF46A6D2);

    return Padding(
      padding: const EdgeInsets.only(bottom: 24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'SKU: ${item.skuCode}',
                  style: theme.typography.small.copyWith(
                    color: brandBlue,
                    fontWeight: FontWeight.w500,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                'qtd.: ${item.quantity}',
                style: theme.typography.small.copyWith(
                  color: theme.colorScheme.foreground,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            item.skuName,
            style: theme.typography.base.copyWith(fontWeight: FontWeight.w400),
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              if (item.skuSalePrice > item.price) ...[
                Text(
                  'R\$ ${item.skuSalePrice.toStringAsFixed(2).replaceFirst('.', ',')}',
                  style: theme.typography.small.copyWith(
                    color: theme.colorScheme.mutedForeground,
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
                const SizedBox(width: 8),
              ],
              Text(
                'R\$ ${item.price.toStringAsFixed(2).replaceFirst('.', ',')}',
                style: theme.typography.base.copyWith(
                  color: brandBlue,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
