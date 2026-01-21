import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/components/shortage-time-counter/shortage_time_counter_presenter.dart';

void main() {
  group('ShortageTimeCounterPresenter', () {
    test('should initialize with a positive duration until midnight', () {
      final presenter = ShortageTimeCounterPresenter(10);

      expect(presenter.stock, equals(10));
      expect(presenter.remainingTime.value.isNegative, isFalse);
      expect(presenter.remainingTime.value, isNot(Duration.zero));
      expect(presenter.remainingTime.value.inHours, lessThanOrEqualTo(24));

      presenter.dispose();
    });

    test('should update remaining time periodicially', () async {
      final presenter = ShortageTimeCounterPresenter(10);
      final initialTime = presenter.remainingTime.value;

      // Wait for more than 1 second to see the change
      await Future.delayed(const Duration(milliseconds: 1100));

      expect(presenter.remainingTime.value, isNot(equals(initialTime)));

      presenter.dispose();
    });

    test('should dispose timer', () {
      final presenter = ShortageTimeCounterPresenter(10);

      // We can't easily verify the timer is cancelled without exposing it,
      // but we can ensure dispose runs without error.
      expect(() => presenter.dispose(), returnsNormally);
    });
  });
}
