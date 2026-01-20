import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/brands-filter-modal/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/category-filter-modal/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/filters_bar_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class FiltersBarView extends ConsumerWidget {
  final void Function({String? categoryId, required List<String> brandsIds})?
  onFilterChanged;

  const FiltersBarView({super.key, this.onFilterChanged});

  void _openCategoryModal(BuildContext context, WidgetRef ref) {
    final presenter = ref.read(filtersBarPresenterProvider);

    showDialog(
      context: context,
      builder: (context) => CategoryFilterModal(
        categories: presenter.categories.value,
        selectedCategory: presenter.selectedCategory.value,
        onSelect: (category) {
          presenter.selectCategory(category);
          _notifyFilterChange(ref);
        },
      ),
    );
  }

  void _openBrandsModal(BuildContext context, WidgetRef ref) {
    final presenter = ref.read(filtersBarPresenterProvider);

    showDialog(
      context: context,
      builder: (context) => BrandsFilterModal(
        brands: presenter.brands.value,
        selectedBrands: presenter.selectedBrands.value,
        onConfirm: (brands) {
          presenter.setSelectedBrands(brands);
          _notifyFilterChange(ref);
        },
      ),
    );
  }

  void _clearFilters(WidgetRef ref) {
    final presenter = ref.read(filtersBarPresenterProvider);
    presenter.clearFilters();
    _notifyFilterChange(ref);
  }

  void _notifyFilterChange(WidgetRef ref) {
    final presenter = ref.read(filtersBarPresenterProvider);
    onFilterChanged?.call(
      categoryId: presenter.selectedCategory.value?.id,
      brandsIds: presenter.selectedBrands.value
          .map((brand) => brand.id)
          .toList(),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(filtersBarPresenterProvider);

    return Watch((context) {
      final hasFilters =
          presenter.selectedCategory.value != null ||
          presenter.selectedBrands.value.isNotEmpty;

      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            Expanded(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    Button.outline(
                      onPressed: () => _openCategoryModal(context, ref),
                      leading: const Icon(Icons.category),
                      child: Text(
                        presenter.selectedCategory.value?.name ?? 'Categoria',
                      ),
                    ),
                    const SizedBox(width: 8),
                    Button.outline(
                      onPressed: () => _openBrandsModal(context, ref),
                      leading: const Icon(Icons.business),
                      child: Text(
                        presenter.selectedBrands.value.isEmpty
                            ? 'Marcas'
                            : 'Marcas (${presenter.selectedBrands.value.length})',
                      ),
                    ),
                  ],
                ),
              ),
            ),
            if (hasFilters) ...[
              const SizedBox(width: 8),
              IconButton.outline(
                icon: const Icon(Icons.clear),
                onPressed: () => _clearFilters(ref),
              ),
            ],
          ],
        ),
      );
    });
  }
}
