import 'package:shadcn_flutter/shadcn_flutter.dart';

class OrdersErrorStateView extends StatelessWidget {
  final String message;
  final VoidCallback onRetry;

  const OrdersErrorStateView({
    super.key,
    required this.message,
    required this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            LucideIcons.circleAlert,
            size: 64,
            color: theme.colorScheme.destructive,
          ),
          const SizedBox(height: 16),
          Text(
            'Ops! Algo deu errado',
            style: theme.typography.h4.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            message,
            textAlign: TextAlign.center,
            style: theme.typography.small.copyWith(
              color: theme.colorScheme.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          PrimaryButton(
            onPressed: onRetry,
            child: const Text('Tentar novamente'),
          ),
        ],
      ),
    );
  }
}
