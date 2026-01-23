import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-skeleton/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/similar-products/similar_products_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class SimilarProductsSectionView extends ConsumerWidget {
  final String productId;

  const SimilarProductsSectionView({super.key, required this.productId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(similarProductsPresenterProvider(productId));

    return Watch((context) {
      final products = presenter.products.value;
      final isLoading = presenter.isLoading.value;

      if (!isLoading && products.isEmpty) return const SizedBox.shrink();

      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 24),
            child: Text(
              'Produtos similares',
              style: Theme.of(
                context,
              ).typography.h4.copyWith(fontWeight: FontWeight.bold),
            ),
          ),
          SizedBox(
            height: 380,
            child: () {
              if (isLoading && products.isEmpty) {
                return ListView.separated(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  itemCount: 3,
                  separatorBuilder: (context, index) =>
                      const SizedBox(width: 12),
                  itemBuilder: (context, index) => const SizedBox(
                    width: 200,
                    child: ProductCardSkeleton(isColumn: true),
                  ),
                );
              }

              return ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 24),
                itemCount: products.length,
                separatorBuilder: (context, index) => const SizedBox(width: 12),
                itemBuilder: (context, index) {
                  final product = products[index];
                  return SizedBox(
                    width: 200,
                    child: ProductCard(product: product, isColumn: true),
                  );
                },
              );
            }(),
          ),
          const SizedBox(height: 24),
        ],
      );
    });
  }
}
