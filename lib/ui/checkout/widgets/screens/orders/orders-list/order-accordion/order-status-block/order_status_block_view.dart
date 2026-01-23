import 'package:intl/intl.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/core/checkout/dtos/order_dto.dart';

class OrderStatusBlockView extends StatelessWidget {
  final OrderStatus status;
  final DateTime createdAt;

  const OrderStatusBlockView({
    super.key,
    required this.status,
    required this.createdAt,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'STATUS',
              style: theme.typography.small.copyWith(
                color: theme.colorScheme.mutedForeground,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            _buildStatusBadge(context),
          ],
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              'DATA',
              style: theme.typography.small.copyWith(
                color: theme.colorScheme.mutedForeground,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              DateFormat('dd/MM/yyyy').format(createdAt),
              style: theme.typography.base.copyWith(
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatusBadge(BuildContext context) {
    final theme = Theme.of(context);
    String label = '';
    Color bgColor = Colors.blue.withOpacity(0.1);
    Color textColor = Colors.blue;
    Color borderColor = Colors.blue.withOpacity(0.3);

    switch (status) {
      case OrderStatus.paid:
        label = 'Pago';
        bgColor = Colors.green.withOpacity(0.1);
        textColor = Colors.green;
        borderColor = Colors.green.withOpacity(0.3);
        break;
      case OrderStatus.created:
        label = 'Criado';
        bgColor = Colors.blue.withOpacity(0.1);
        textColor = Colors.blue;
        borderColor = Colors.blue.withOpacity(0.3);
        break;
      case OrderStatus.cancelled:
        label = 'Cancelado';
        bgColor = const Color(0xFFFFDADA);
        textColor = const Color(0xFF7A1E1E);
        borderColor = const Color(0xFFF0A0A0);
        break;
      case OrderStatus.refused:
        label = 'Recusado';
        bgColor = Colors.red.withOpacity(0.1);
        textColor = Colors.red;
        borderColor = Colors.red.withOpacity(0.3);
        break;
      case OrderStatus.authorized:
        label = 'Autorizado';
        bgColor = Colors.orange.withOpacity(0.1);
        textColor = Colors.orange;
        borderColor = Colors.orange.withOpacity(0.3);
        break;
      case OrderStatus.delivered:
        label = 'Entregue';
        bgColor = Colors.green.withOpacity(0.1);
        textColor = Colors.green;
        borderColor = Colors.green.withOpacity(0.3);
        break;
      case OrderStatus.waitingPayment:
        label = 'Aguardando Pagamento';
        bgColor = Colors.orange.withOpacity(0.1);
        textColor = Colors.orange;
        borderColor = Colors.orange.withOpacity(0.3);
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        border: Border.all(color: borderColor),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        label,
        style: theme.typography.small.copyWith(
          color: textColor,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
