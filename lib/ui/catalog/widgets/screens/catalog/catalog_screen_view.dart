import 'package:flutter/material.dart' hide Scaffold;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/stores/catalog_store.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

class CatalogScreenView extends ConsumerStatefulWidget {
  final bool focusSearch;
  final String? initialQuery;

  const CatalogScreenView({
    super.key,
    this.focusSearch = false,
    this.initialQuery,
  });

  @override
  ConsumerState<CatalogScreenView> createState() => _CatalogScreenViewState();
}

class _CatalogScreenViewState extends ConsumerState<CatalogScreenView> {
  @override
  void initState() {
    super.initState();
    if (widget.initialQuery != null || widget.focusSearch) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final store = ref.read(catalogStoreProvider);
        store.setSearch(widget.initialQuery ?? '', focus: widget.focusSearch);
      });
    }
  }

  @override
  void didUpdateWidget(covariant CatalogScreenView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if ((widget.initialQuery != oldWidget.initialQuery &&
            widget.initialQuery != null) ||
        widget.focusSearch != oldWidget.focusSearch) {
      final store = ref.read(catalogStoreProvider);
      store.setSearch(widget.initialQuery ?? '', focus: widget.focusSearch);
    }
  }

  @override
  Widget build(BuildContext context) {
    return shadcn.Scaffold(
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
