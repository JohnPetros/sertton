import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

import 'package:sertton/ui/global/widgets/screens/home/footer-section/company-info-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/index.dart';

class HomeFooterView extends ConsumerWidget {
  const HomeFooterView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 24),
      decoration: BoxDecoration(
        color: theme.colorScheme.muted.withValues(alpha: 0.2),
        border: Border(
          top: BorderSide(color: theme.colorScheme.border, width: 1),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const PaymentMethodsSection(),
          const SizedBox(height: 32),
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.9,
            child: const Divider(),
          ),
          const SizedBox(height: 32),
          const CompanyInfoSection(),
        ],
      ),
    );
  }
}
