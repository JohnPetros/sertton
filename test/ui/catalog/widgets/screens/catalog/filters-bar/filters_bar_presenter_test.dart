import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import '../../../../../../fakers/brand_faker.dart';
import '../../../../../../fakers/category_faker.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/filters_bar_presenter.dart';

class MockCatalogService extends Mock implements CatalogService {}

void main() {
  group('FiltersBarPresenter', () {
    late FiltersBarPresenter presenter;
    late MockCatalogService mockCatalogService;

    setUp(() {
      mockCatalogService = MockCatalogService();

      when(
        () => mockCatalogService.fetchCategories(),
      ).thenAnswer((_) async => RestResponse(body: []));
      when(
        () => mockCatalogService.fetchBrands(),
      ).thenAnswer((_) async => RestResponse(body: []));

      presenter = FiltersBarPresenter(mockCatalogService);
    });

    group('initialization', () {
      test('should initialize with empty signals', () {
        expect(presenter.selectedCategory.value, isNull);
        expect(presenter.selectedBrands.value, isEmpty);
        expect(presenter.categories.value, isEmpty);
        expect(presenter.brands.value, isEmpty);
      });
    });

    group('loadFiltersData', () {
      test('should load categories and brands successfully', () async {
        final mockCategories = CategoryFaker.fakeManyDto(count: 3);
        final mockBrands = BrandFaker.fakeManyDto(count: 3);

        when(
          () => mockCatalogService.fetchCategories(),
        ).thenAnswer((_) async => RestResponse(body: mockCategories));
        when(
          () => mockCatalogService.fetchBrands(),
        ).thenAnswer((_) async => RestResponse(body: mockBrands));

        await presenter.loadFiltersData();

        expect(presenter.categories.value, equals(mockCategories));
        expect(presenter.brands.value, equals(mockBrands));
        expect(presenter.isLoading.value, isFalse);
      });

      test('should set isLoading to true during loading', () async {
        when(
          () => mockCatalogService.fetchCategories(),
        ).thenAnswer((_) async => RestResponse(body: []));
        when(
          () => mockCatalogService.fetchBrands(),
        ).thenAnswer((_) async => RestResponse(body: []));

        final loadingFuture = presenter.loadFiltersData();
        expect(presenter.isLoading.value, isTrue);

        await loadingFuture;
        expect(presenter.isLoading.value, isFalse);
      });

      test('should handle categories fetch failure', () async {
        final mockBrands = BrandFaker.fakeManyDto(count: 2);

        when(
          () => mockCatalogService.fetchCategories(),
        ).thenAnswer((_) async => RestResponse(errorMessage: 'Error'));
        when(
          () => mockCatalogService.fetchBrands(),
        ).thenAnswer((_) async => RestResponse(body: mockBrands));

        await presenter.loadFiltersData();

        expect(presenter.categories.value, isEmpty);
        expect(presenter.brands.value, equals(mockBrands));
        expect(presenter.isLoading.value, isFalse);
      });

      test('should handle brands fetch failure', () async {
        final mockCategories = CategoryFaker.fakeManyDto(count: 2);

        when(
          () => mockCatalogService.fetchCategories(),
        ).thenAnswer((_) async => RestResponse(body: mockCategories));
        when(
          () => mockCatalogService.fetchBrands(),
        ).thenAnswer((_) async => RestResponse(errorMessage: 'Error'));

        await presenter.loadFiltersData();

        expect(presenter.categories.value, equals(mockCategories));
        expect(presenter.brands.value, isEmpty);
        expect(presenter.isLoading.value, isFalse);
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
    });

    group('toggleBrand', () {
      test('should add brand when not selected', () {
        final brand = BrandFaker.fakeDto();

        presenter.toggleBrand(brand);

        expect(presenter.selectedBrands.value, contains(brand));
        expect(presenter.selectedBrands.value, hasLength(1));
      });

      test('should remove brand when already selected', () {
        final brand = BrandFaker.fakeDto();
        presenter.toggleBrand(brand);

        presenter.toggleBrand(brand);

        expect(presenter.selectedBrands.value, isNot(contains(brand)));
        expect(presenter.selectedBrands.value, isEmpty);
      });

      test('should handle multiple brands correctly', () {
        final brand1 = BrandFaker.fakeDto();
        final brand2 = BrandFaker.fakeDto();

        presenter.toggleBrand(brand1);
        presenter.toggleBrand(brand2);

        expect(presenter.selectedBrands.value, hasLength(2));
        expect(presenter.selectedBrands.value, contains(brand1));
        expect(presenter.selectedBrands.value, contains(brand2));
      });
    });

    group('setSelectedBrands', () {
      test('should set selected brands list', () {
        final brands = BrandFaker.fakeManyDto(count: 3);

        presenter.setSelectedBrands(brands);

        expect(presenter.selectedBrands.value, equals(brands));
        expect(presenter.selectedBrands.value, hasLength(3));
      });

      test('should replace previously selected brands', () {
        final brands1 = BrandFaker.fakeManyDto(count: 2);
        final brands2 = BrandFaker.fakeManyDto(count: 3);

        presenter.setSelectedBrands(brands1);
        presenter.setSelectedBrands(brands2);

        expect(presenter.selectedBrands.value, equals(brands2));
        expect(presenter.selectedBrands.value, hasLength(3));
      });
    });

    group('clearFilters', () {
      test('should clear all filters', () {
        final category = CategoryFaker.fakeDto();
        final brands = BrandFaker.fakeManyDto(count: 2);

        presenter.selectCategory(category);
        presenter.setSelectedBrands(brands);

        presenter.clearFilters();

        expect(presenter.selectedCategory.value, isNull);
        expect(presenter.selectedBrands.value, isEmpty);
      });

      test('should do nothing when already empty', () {
        presenter.clearFilters();

        expect(presenter.selectedCategory.value, isNull);
        expect(presenter.selectedBrands.value, isEmpty);
      });
    });
  });
}
