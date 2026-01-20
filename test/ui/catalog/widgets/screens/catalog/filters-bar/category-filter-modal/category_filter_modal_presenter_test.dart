import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/category-filter-modal/category_filter_modal_presenter.dart';

import '../../../../../../../fakers/category_faker.dart';

void main() {
  group('CategoryFilterModalPresenter', () {
    late CategoryFilterModalPresenter presenter;

    setUp(() {
      presenter = CategoryFilterModalPresenter(initialSelectedCategory: null);
    });

    group('initialization', () {
      test(
        'should initialize with null selectedCategory when no initial category',
        () {
          expect(presenter.selectedCategory.value, isNull);
        },
      );

      test('should initialize with provided initial category', () {
        final initialCategory = CategoryFaker.fakeDto();
        presenter = CategoryFilterModalPresenter(
          initialSelectedCategory: initialCategory,
        );

        expect(presenter.selectedCategory.value, equals(initialCategory));
      });
    });

    group('selectCategory', () {
      test('should set selected category', () {
        final category = CategoryFaker.fakeDto();

        presenter.selectCategory(category);

        expect(presenter.selectedCategory.value, equals(category));
      });

      test('should allow setting category to null', () {
        final category = CategoryFaker.fakeDto();
        presenter.selectCategory(category);

        presenter.selectCategory(null);

        expect(presenter.selectedCategory.value, isNull);
      });

      test('should replace previously selected category', () {
        final category1 = CategoryFaker.fakeDto();
        final category2 = CategoryFaker.fakeDto();

        presenter.selectCategory(category1);
        presenter.selectCategory(category2);

        expect(presenter.selectedCategory.value, equals(category2));
        expect(presenter.selectedCategory.value, isNot(equals(category1)));
      });
    });

    group('isCategorySelected', () {
      test(
        'should return true when checking null and no category is selected',
        () {
          expect(presenter.isCategorySelected(null), isTrue);
        },
      );

      test(
        'should return false when checking null and a category is selected',
        () {
          final category = CategoryFaker.fakeDto();
          presenter.selectCategory(category);

          expect(presenter.isCategorySelected(null), isFalse);
        },
      );

      test('should return true when category is selected', () {
        final category = CategoryFaker.fakeDto();
        presenter.selectCategory(category);

        expect(presenter.isCategorySelected(category), isTrue);
      });

      test('should return false when category is not selected', () {
        final category = CategoryFaker.fakeDto();

        expect(presenter.isCategorySelected(category), isFalse);
      });

      test('should identify category by id', () {
        final category1 = CategoryFaker.fakeDto();
        final category2 = CategoryDto(
          id: category1.id,
          name: 'Different Name',
          description: 'Different Description',
        );
        presenter.selectCategory(category1);

        expect(presenter.isCategorySelected(category2), isTrue);
      });

      test('should return false when different category is selected', () {
        final category1 = CategoryFaker.fakeDto();
        final category2 = CategoryFaker.fakeDto();
        presenter.selectCategory(category1);

        expect(presenter.isCategorySelected(category2), isFalse);
      });
    });
  });
}
