import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/payment_methods_section_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/widgets/payment_methods_skeleton.dart';

class PaymentMethodsSectionView extends ConsumerWidget {
  const PaymentMethodsSectionView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(paymentMethodsSectionPresenterProvider);

    return Watch((context) {
      if (presenter.isLoading.value) {
        return const PaymentMethodsSkeleton();
      }

      final methods = presenter.paymentMethods.value;
      if (methods.isEmpty) {
        return const Text('Nenhuma forma de pagamento disponível');
      }

      return Column(
        children: [
          const Text(
            'FORMAS DE PAGAMENTO',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w700,
              color: Colors.gray,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            alignment: WrapAlignment.center,
            children: methods.map((method) {
              return SvgPicture.network(
                method.icon,
                height: 32,
                width: 38,
                fit: BoxFit.contain,
                placeholderBuilder: (context) => const SkeletonItem(),
              );
            }).toList(),
          ),
        ],
      );
    });
  }
}
