import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/components/discount-badge/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-pricing/product_pricing_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class ProductPricingView extends ConsumerWidget {
  final double originalPrice;
  final double currentPrice;

  const ProductPricingView({
    super.key,
    required this.originalPrice,
    required this.currentPrice,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      productPricingPresenterProvider((
        originalPrice: originalPrice,
        currentPrice: currentPrice,
      )),
    );
    final theme = Theme.of(context);

    return Watch(
      (context) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (presenter.hasDiscount.value) ...[
            Row(
              children: [
                Text(
                  presenter.formattedOriginalPrice.value,
                  style: theme.typography.base.copyWith(
                    color: theme.colorScheme.mutedForeground,
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
                const SizedBox(width: 8),
                DiscountBadge(
                  salePrice: originalPrice,
                  discountPrice: currentPrice,
                ),
              ],
            ),
            const SizedBox(height: 8),
          ],
          Text(
            presenter.formattedCurrentPrice.value,
            style: theme.typography.h2.copyWith(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
