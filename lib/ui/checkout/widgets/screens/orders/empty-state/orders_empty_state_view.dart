import 'package:shadcn_flutter/shadcn_flutter.dart';

class OrdersEmptyStateView extends StatelessWidget {
  final VoidCallback onLogout;

  const OrdersEmptyStateView({super.key, required this.onLogout});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              LucideIcons.packageOpen,
              size: 64,
              color: theme.colorScheme.mutedForeground,
            ),
            const SizedBox(height: 16),
            Text(
              'Nenhum pedido encontrado',
              style: theme.typography.h4.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Não identificamos nenhum pedido vinculado a este documento.',
              textAlign: TextAlign.center,
              style: theme.typography.small.copyWith(
                color: theme.colorScheme.mutedForeground,
              ),
            ),
            const SizedBox(height: 24),
            SecondaryButton(
              onPressed: onLogout,
              child: const Text('Alterar documento'),
            ),
          ],
        ),
      ),
    );
  }
}
