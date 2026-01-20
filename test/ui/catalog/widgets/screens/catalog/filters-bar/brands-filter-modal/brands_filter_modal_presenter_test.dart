import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/fakers/brand_faker.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/brands-filter-modal/brands_filter_modal_presenter.dart';

void main() {
  group('BrandsFilterModalPresenter', () {
    late BrandsFilterModalPresenter presenter;

    setUp(() {
      presenter = BrandsFilterModalPresenter(initialSelectedBrands: []);
    });

    group('initialization', () {
      test(
        'should initialize with empty tempSelectedBrands when no initial brands',
        () {
          expect(presenter.tempSelectedBrands.value, isEmpty);
        },
      );

      test('should initialize with provided initial brands', () {
        final initialBrands = BrandFaker.fakeManyDto(count: 2);
        presenter = BrandsFilterModalPresenter(
          initialSelectedBrands: initialBrands,
        );

        expect(presenter.tempSelectedBrands.value, hasLength(2));
        expect(presenter.tempSelectedBrands.value, equals(initialBrands));
      });
    });

    group('toggleBrand', () {
      test('should add brand when not selected', () {
        final brand = BrandFaker.fakeDto();

        presenter.toggleBrand(brand);

        expect(presenter.tempSelectedBrands.value, contains(brand));
        expect(presenter.tempSelectedBrands.value, hasLength(1));
      });

      test('should remove brand when already selected', () {
        final brand = BrandFaker.fakeDto();
        presenter.toggleBrand(brand);

        presenter.toggleBrand(brand);

        expect(presenter.tempSelectedBrands.value, isNot(contains(brand)));
        expect(presenter.tempSelectedBrands.value, isEmpty);
      });

      test('should handle multiple brands correctly', () {
        final brand1 = BrandFaker.fakeDto();
        final brand2 = BrandFaker.fakeDto();

        presenter.toggleBrand(brand1);
        presenter.toggleBrand(brand2);

        expect(presenter.tempSelectedBrands.value, hasLength(2));
        expect(presenter.tempSelectedBrands.value, contains(brand1));
        expect(presenter.tempSelectedBrands.value, contains(brand2));
      });
    });

    group('clearSelection', () {
      test('should clear all selected brands', () {
        final brands = BrandFaker.fakeManyDto(count: 3);
        for (final brand in brands) {
          presenter.toggleBrand(brand);
        }

        presenter.clearSelection();

        expect(presenter.tempSelectedBrands.value, isEmpty);
      });

      test('should do nothing when already empty', () {
        presenter.clearSelection();

        expect(presenter.tempSelectedBrands.value, isEmpty);
      });
    });

    group('isBrandSelected', () {
      test('should return true when brand is selected', () {
        final brand = BrandFaker.fakeDto();
        presenter.toggleBrand(brand);

        expect(presenter.isBrandSelected(brand), isTrue);
      });

      test('should return false when brand is not selected', () {
        final brand = BrandFaker.fakeDto();

        expect(presenter.isBrandSelected(brand), isFalse);
      });

      test('should identify brand by id', () {
        final brand1 = BrandFaker.fakeDto();
        final brand2 = BrandDto(id: brand1.id, name: 'Different Name');
        presenter.toggleBrand(brand1);

        expect(presenter.isBrandSelected(brand2), isTrue);
      });
    });
  });
}
