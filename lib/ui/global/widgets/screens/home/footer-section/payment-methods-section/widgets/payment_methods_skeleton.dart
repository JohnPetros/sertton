import 'package:shadcn_flutter/shadcn_flutter.dart';

class PaymentMethodsSkeleton extends StatelessWidget {
  const PaymentMethodsSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      alignment: WrapAlignment.center,
      children: List.generate(4, (index) => const SkeletonItem()),
    );
  }
}

class SkeletonItem extends StatelessWidget {
  const SkeletonItem({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      width: 38,
      height: 24,
      decoration: BoxDecoration(
        color: theme.colorScheme.muted,
        borderRadius: BorderRadius.circular(4),
      ),
    );
  }
}
