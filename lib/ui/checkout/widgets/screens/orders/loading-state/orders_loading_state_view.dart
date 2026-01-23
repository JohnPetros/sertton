import 'package:shadcn_flutter/shadcn_flutter.dart';

class OrdersLoadingStateView extends StatelessWidget {
  const OrdersLoadingStateView({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.all(24),
      itemCount: 5,
      separatorBuilder: (_, _) => const SizedBox(height: 16),
      itemBuilder: (context, _) => Container(
        width: double.infinity,
        height: 80,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.muted,
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }
}
