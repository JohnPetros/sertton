import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/components/discount-badge/discount_badge_presenter.dart';

import 'package:signals/signals_flutter.dart';

class DiscountBadgeView extends ConsumerWidget {
  final double salePrice;
  final double discountPrice;

  const DiscountBadgeView({
    super.key,
    required this.salePrice,
    required this.discountPrice,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      discountBadgePresenterProvider((
        salePrice: salePrice,
        discountPrice: discountPrice,
      )),
    );

    return Watch((context) {
      if (!presenter.isVisible.value) return const SizedBox.shrink();

      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.primary,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          presenter.formattedText.value,
          style: TextStyle(
            color: Theme.of(context).colorScheme.onPrimary,
            fontSize: 12,
            fontWeight: FontWeight.bold,
          ),
        ),
      );
    });
  }
}
