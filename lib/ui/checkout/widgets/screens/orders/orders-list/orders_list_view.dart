import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'order-accordion/order_accordion_view.dart';

class OrdersListView extends StatelessWidget {
  final List<OrderDto> orders;

  const OrdersListView({super.key, required this.orders});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
      itemCount: orders.length,
      separatorBuilder: (_, _) => const SizedBox(height: 16),
      itemBuilder: (context, index) {
        return OrderAccordionView(order: orders[index]);
      },
    );
  }
}
