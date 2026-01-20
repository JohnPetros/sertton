import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

class FiltersBarPresenter {
  final CatalogService _catalogService;

  final selectedCategory = signal<CategoryDto?>(null);
  final selectedBrands = signal<List<BrandDto>>([]);
  final categories = signal<List<CategoryDto>>([]);
  final brands = signal<List<BrandDto>>([]);
  final isLoading = signal(false);

  FiltersBarPresenter(this._catalogService) {
    loadFiltersData();
  }

  Future<void> loadFiltersData() async {
    isLoading.value = true;

    final categoriesResponse = await _catalogService.fetchCategories();
    final brandsResponse = await _catalogService.fetchBrands();

    if (!categoriesResponse.isFailure) {
      categories.value = categoriesResponse.body;
    }

    if (!brandsResponse.isFailure) {
      brands.value = brandsResponse.body;
    }

    isLoading.value = false;
  }

  void selectCategory(CategoryDto? category) {
    selectedCategory.value = category;
  }

  void toggleBrand(BrandDto brand) {
    final currentBrands = List<BrandDto>.from(selectedBrands.value);
    if (currentBrands.any((b) => b.id == brand.id)) {
      currentBrands.removeWhere((b) => b.id == brand.id);
    } else {
      currentBrands.add(brand);
    }
    selectedBrands.value = currentBrands;
  }

  void setSelectedBrands(List<BrandDto> brands) {
    selectedBrands.value = brands;
  }

  void clearFilters() {
    selectedCategory.value = null;
    selectedBrands.value = [];
  }
}

final filtersBarPresenterProvider = Provider.autoDispose<FiltersBarPresenter>((
  ref,
) {
  final catalogService = ref.read(catalogServiceProvider);
  return FiltersBarPresenter(catalogService);
});
