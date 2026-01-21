import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-header/product_header_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class ProductHeaderView extends ConsumerWidget {
  final String skuCode;
  final String title;

  const ProductHeaderView({
    super.key,
    required this.skuCode,
    required this.title,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      productHeaderPresenterProvider((skuCode: skuCode, title: title)),
    );
    final theme = Theme.of(context);

    return Watch(
      (context) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // SKU Code
          Text(
            presenter.formattedSkuCode.value,
            style: theme.typography.small.copyWith(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          // Product Title
          Text(
            title,
            style: theme.typography.h2.copyWith(
              color: theme.colorScheme.foreground,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
