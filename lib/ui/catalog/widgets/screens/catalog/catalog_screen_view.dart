import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class CatalogScreenView extends ConsumerWidget {
  const CatalogScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      headers: const [AppBar(title: Text('Catálogo'))],
      child: Column(
        children: [
          FiltersBar(
            onFilterChanged: ({categoryId, required brandsIds}) {
              ref
                  .read(presenterProvider)
                  .applyFilter(categoryId: categoryId, brandsIds: brandsIds);
            },
          ),
          const Expanded(child: ProductList()),
        ],
      ),
    );
  }
}
