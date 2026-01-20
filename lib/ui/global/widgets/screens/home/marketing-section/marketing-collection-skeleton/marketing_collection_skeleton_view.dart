import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-skeleton/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class MarketingCollectionSkeletonView extends StatelessWidget {
  const MarketingCollectionSkeletonView({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 24),
          child: Container(
            width: 150,
            height: 24,
            decoration: BoxDecoration(
              color: theme.colorScheme.muted,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
        SizedBox(
          height: 380,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 24),
            itemCount: 3,
            separatorBuilder: (context, index) => const SizedBox(width: 12),
            itemBuilder: (context, index) => const SizedBox(
              width: 200,
              child: ProductCardSkeleton(isColumn: true),
            ),
          ),
        ),
      ],
    );
  }
}
