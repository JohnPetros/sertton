import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-skeleton/product_card_skeleton_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class ProductCardSkeletonView extends ConsumerWidget {
  final bool isColumn;

  const ProductCardSkeletonView({super.key, this.isColumn = false});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(productCardSkeletonPresenterProvider);
    final theme = Theme.of(context);

    final imageSize = isColumn ? 200.0 : presenter.imageSize;

    final content = [
      // Skeleton da imagem
      Container(
        width: imageSize,
        height: imageSize,
        decoration: BoxDecoration(
          color: theme.colorScheme.muted,
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      if (isColumn) const SizedBox(height: 12) else const SizedBox(width: 12),
      // Skeleton das informações
      isColumn
          ? Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: _buildInfoSkeleton(theme),
            )
          : Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: _buildInfoSkeleton(theme),
              ),
            ),
    ];

    return Card(
      padding: const EdgeInsets.all(12),
      child: isColumn
          ? Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: content,
            )
          : Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: content,
            ),
    );
  }

  List<Widget> _buildInfoSkeleton(ThemeData theme) {
    return [
      // SKU
      Container(
        width: 80,
        height: 12,
        decoration: BoxDecoration(
          color: theme.colorScheme.muted,
          borderRadius: BorderRadius.circular(4),
        ),
      ),
      const SizedBox(height: 4),
      // Brand
      Container(
        width: 100,
        height: 12,
        decoration: BoxDecoration(
          color: theme.colorScheme.muted,
          borderRadius: BorderRadius.circular(4),
        ),
      ),
      const SizedBox(height: 8),
      // Product name (2 lines)
      Container(
        width: double.infinity,
        height: 14,
        decoration: BoxDecoration(
          color: theme.colorScheme.muted,
          borderRadius: BorderRadius.circular(4),
        ),
      ),
      const SizedBox(height: 4),
      Container(
        width: 150,
        height: 14,
        decoration: BoxDecoration(
          color: theme.colorScheme.muted,
          borderRadius: BorderRadius.circular(4),
        ),
      ),
      const SizedBox(height: 12),
      // Price
      Container(
        width: 120,
        height: 18,
        decoration: BoxDecoration(
          color: theme.colorScheme.muted,
          borderRadius: BorderRadius.circular(4),
        ),
      ),
    ];
  }
}
