import 'package:flutter/material.dart' hide Card, Theme;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-skeleton/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class ProductListView extends ConsumerStatefulWidget {
  const ProductListView({super.key});

  @override
  ConsumerState<ProductListView> createState() => _ProductListViewState();
}

class _ProductListViewState extends ConsumerState<ProductListView> {
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent - 200) {
      ref.read(presenterProvider).loadMoreProducts();
    }
  }

  @override
  Widget build(BuildContext context) {
    final presenter = ref.watch(presenterProvider);

    return Watch((context) {
      if (presenter.products.value.isEmpty && presenter.isLoading.value) {
        return ListView.separated(
          padding: const EdgeInsets.all(16),
          itemCount: 5,
          separatorBuilder: (context, index) => const SizedBox(height: 12),
          itemBuilder: (context, index) => const ProductCardSkeleton(),
        );
      }

      if (presenter.error.value != null && presenter.products.value.isEmpty) {
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                presenter.error.value!,
                style: TextStyle(
                  color: Theme.of(context).colorScheme.destructive,
                ),
              ),
              const SizedBox(height: 16),
              Button.outline(
                onPressed: presenter.refresh,
                child: const Text('Tentar novamente'),
              ),
            ],
          ),
        );
      }

      return RefreshIndicator(
        onRefresh: presenter.refresh,
        child: ListView.separated(
          controller: _scrollController,
          padding: const EdgeInsets.all(16),
          itemCount:
              presenter.products.value.length +
              (presenter.hasMore.value ? 1 : 0),
          separatorBuilder: (context, index) => const SizedBox(height: 12),
          itemBuilder: (context, index) {
            if (index >= presenter.products.value.length) {
              return const ProductCardSkeleton();
            }

            final product = presenter.products.value[index];
            return ProductCard(product: product);
          },
        ),
      );
    });
  }
}
