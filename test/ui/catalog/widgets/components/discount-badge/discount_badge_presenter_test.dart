import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/discount_badge_presenter.dart';

void main() {
  group('DiscountBadgePresenter', () {
    test(
      'isVisible should be true when discountPrice is less than salePrice',
      () {
        final presenter = DiscountBadgePresenter(
          salePrice: 100.0,
          discountPrice: 80.0,
        );

        expect(presenter.isVisible.value, isTrue);
      },
    );

    test('isVisible should be false when discountPrice equals salePrice', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 100.0,
        discountPrice: 100.0,
      );

      expect(presenter.isVisible.value, isFalse);
    });

    test(
      'isVisible should be false when discountPrice is greater than salePrice',
      () {
        final presenter = DiscountBadgePresenter(
          salePrice: 100.0,
          discountPrice: 120.0,
        );

        expect(presenter.isVisible.value, isFalse);
      },
    );

    test(
      'isVisible should be true when both prices are very small but discount exists',
      () {
        final presenter = DiscountBadgePresenter(
          salePrice: 0.01,
          discountPrice: 0.005,
        );

        expect(presenter.isVisible.value, isTrue);
      },
    );

    test('isVisible should be false when both prices are zero', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 0.0,
        discountPrice: 0.0,
      );

      expect(presenter.isVisible.value, isFalse);
    });

    test('percentage should calculate 20% discount correctly', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 100.0,
        discountPrice: 80.0,
      );

      expect(presenter.percentage.value, equals(20));
    });

    test('percentage should calculate 50% discount correctly', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 200.0,
        discountPrice: 100.0,
      );

      expect(presenter.percentage.value, equals(50));
    });

    test('percentage should calculate 75% discount correctly', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 400.0,
        discountPrice: 100.0,
      );

      expect(presenter.percentage.value, equals(75));
    });

    test('percentage should round to nearest integer', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 150.0,
        discountPrice: 100.0,
      );

      expect(presenter.percentage.value, equals(33));
    });

    test('percentage should round up when value is .5 or higher', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 300.0,
        discountPrice: 100.0,
      );

      expect(presenter.percentage.value, equals(67));
    });

    test('percentage should return 0 when prices are equal', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 100.0,
        discountPrice: 100.0,
      );

      expect(presenter.percentage.value, equals(0));
    });

    test('percentage should handle small price differences', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 100.0,
        discountPrice: 99.0,
      );

      expect(presenter.percentage.value, equals(1));
    });

    test('percentage should handle decimal prices correctly', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 99.99,
        discountPrice: 74.99,
      );

      expect(presenter.percentage.value, equals(25));
    });

    test('percentage should calculate correctly for very large prices', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 10000.0,
        discountPrice: 7000.0,
      );

      expect(presenter.percentage.value, equals(30));
    });

    test('formattedText should format with arrow and percentage symbol', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 100.0,
        discountPrice: 80.0,
      );

      expect(presenter.formattedText.value, equals('↓ 20 %'));
    });

    test('formattedText should format correctly for 50% discount', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 200.0,
        discountPrice: 100.0,
      );

      expect(presenter.formattedText.value, equals('↓ 50 %'));
    });

    test(
      'formattedText should format correctly for single digit percentage',
      () {
        final presenter = DiscountBadgePresenter(
          salePrice: 100.0,
          discountPrice: 95.0,
        );

        expect(presenter.formattedText.value, equals('↓ 5 %'));
      },
    );

    test(
      'formattedText should format correctly for three digit percentage',
      () {
        final presenter = DiscountBadgePresenter(
          salePrice: 1000.0,
          discountPrice: 1.0,
        );

        expect(presenter.formattedText.value, equals('↓ 100 %'));
      },
    );

    test('formattedText should format correctly when percentage is 0', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 100.0,
        discountPrice: 100.0,
      );

      expect(presenter.formattedText.value, equals('↓ 0 %'));
    });

    test(
      'computed values should be consistent when accessed multiple times',
      () {
        final presenter = DiscountBadgePresenter(
          salePrice: 100.0,
          discountPrice: 80.0,
        );

        final firstAccess = presenter.percentage.value;
        final secondAccess = presenter.percentage.value;

        expect(firstAccess, equals(20));
        expect(secondAccess, equals(20));
        expect(firstAccess, equals(secondAccess));
      },
    );

    test('all computed properties should be consistent with each other', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 150.0,
        discountPrice: 100.0,
      );

      expect(presenter.isVisible.value, isTrue);
      expect(presenter.percentage.value, equals(33));
      expect(presenter.formattedText.value, equals('↓ 33 %'));
    });

    test('should handle negative discount when price increases', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 100.0,
        discountPrice: 150.0,
      );

      expect(presenter.isVisible.value, isFalse);
    });

    test('should handle very small decimal differences', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 10.01,
        discountPrice: 10.00,
      );

      expect(presenter.isVisible.value, isTrue);
      expect(presenter.percentage.value, equals(0));
    });

    test('should handle large price differences', () {
      final presenter = DiscountBadgePresenter(
        salePrice: 999999.99,
        discountPrice: 1.0,
      );

      expect(presenter.isVisible.value, isTrue);
      expect(presenter.percentage.value, equals(100));
      expect(presenter.formattedText.value, equals('↓ 100 %'));
    });
  });
}
