import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-skeleton/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-collection/marketing_collection_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MarketingCollectionView extends ConsumerWidget {
  final CollectionDto collection;

  const MarketingCollectionView({super.key, required this.collection});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      marketingCollectionPresenterProvider(collection.id),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 24),
          child: Text(
            collection.name,
            style: Theme.of(
              context,
            ).typography.h4.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(
          height: 380,
          child: Watch((context) {
            if (presenter.isLoading.value && presenter.products.value.isEmpty) {
              return ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 24),
                itemCount: 3,
                separatorBuilder: (context, index) => const SizedBox(width: 12),
                itemBuilder: (context, index) => const SizedBox(
                  width: 200,
                  child: ProductCardSkeleton(isColumn: true),
                ),
              );
            }

            final products = presenter.products.value;
            if (products.isEmpty) return const SizedBox.shrink();

            return ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
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
          }),
        ),
      ],
    );
  }
}
