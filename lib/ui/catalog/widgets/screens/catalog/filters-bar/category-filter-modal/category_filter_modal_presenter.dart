import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:signals/signals.dart';

class CategoryFilterModalPresenter {
  final CategoryDto? initialSelectedCategory;

  final selectedCategory = signal<CategoryDto?>(null);

  CategoryFilterModalPresenter({required this.initialSelectedCategory}) {
    selectedCategory.value = initialSelectedCategory;
  }

  void selectCategory(CategoryDto? category) {
    selectedCategory.value = category;
  }

  bool isCategorySelected(CategoryDto? category) {
    if (category == null) {
      return selectedCategory.value == null;
    }
    return selectedCategory.value?.id == category.id;
  }
}

final categoryFilterModalPresenterProvider = Provider.autoDispose
    .family<CategoryFilterModalPresenter, CategoryDto?>((
      ref,
      selectedCategory,
    ) {
      return CategoryFilterModalPresenter(
        initialSelectedCategory: selectedCategory,
      );
    });
