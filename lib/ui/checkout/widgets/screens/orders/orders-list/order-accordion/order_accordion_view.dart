import 'package:intl/intl.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/core/checkout/dtos/order_dto.dart';

import 'order-address-section/order_address_section_view.dart';
import 'order-financial-summary/order_financial_summary_view.dart';
import 'order-products-section/order_products_section_view.dart';
import 'order-status-block/order_status_block_view.dart';

class OrderAccordionView extends StatelessWidget {
  final OrderDto order;

  const OrderAccordionView({super.key, required this.order});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final formattedDate = DateFormat('dd/MM/yyyy').format(order.createdAt);

    return Card(
      child: Accordion(
        items: [
          AccordionItem(
            trigger: AccordionTrigger(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Número do pedido',
                    style: theme.typography.p.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '#${order.number}',
                        style: theme.typography.small.copyWith(
                          color: theme.colorScheme.mutedForeground,
                        ),
                      ),
                      Text(
                        formattedDate,
                        style: theme.typography.small.copyWith(
                          color: theme.colorScheme.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            content: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Divider(),
                const SizedBox(height: 16),
                OrderStatusBlockView(
                  status: order.status,
                  createdAt: order.createdAt,
                ),
                const SizedBox(height: 24),
                OrderProductsSectionView(items: order.items),
                const SizedBox(height: 24),
                OrderFinancialSummaryView(
                  items: order.items,
                  shippingPrice: order.shippingPrice,
                ),
                const SizedBox(height: 24),
                OrderAddressSectionView(address: order.shippingAddress),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
