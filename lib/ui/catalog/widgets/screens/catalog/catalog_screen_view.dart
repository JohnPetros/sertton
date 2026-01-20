import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

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
    if (widget.initialQuery != null && widget.initialQuery!.isNotEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        ref.read(presenterProvider).search(widget.initialQuery);
      });
    }
  }

  @override
  void didUpdateWidget(covariant CatalogScreenView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.initialQuery != oldWidget.initialQuery &&
        widget.initialQuery != null) {
      ref.read(presenterProvider).search(widget.initialQuery);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: AppSearchBar(
              initialValue: widget.initialQuery,
              autoFocus: widget.focusSearch,
              onSubmitted: (term) {
                ref.read(presenterProvider).search(term);
              },
              onChanged: (value) {
                if (value.isEmpty) {
                  ref.read(presenterProvider).search('');
                }
              },
            ),
          ),
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
