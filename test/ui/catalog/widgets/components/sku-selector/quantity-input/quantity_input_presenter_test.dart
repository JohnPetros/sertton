import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/quantity-input/quantity_input_presenter.dart';

void main() {
  group('QuantityInputPresenter', () {
    test('should initialize with initial quantity', () {
      final presenter = QuantityInputPresenter(
        initialQuantity: 5,
        maxQuantity: 10,
        onQuantityChanged: (_) {},
      );
      expect(presenter.quantity.value, 5);
      expect(presenter.canIncrement.value, isTrue);
      expect(presenter.canDecrement.value, isTrue);
    });

    test('should increment and call callback when possible', () {
      int? changedValue;
      final presenter = QuantityInputPresenter(
        initialQuantity: 1,
        maxQuantity: 2,
        onQuantityChanged: (val) => changedValue = val,
      );

      presenter.increment();
      expect(presenter.quantity.value, 2);
      expect(changedValue, 2);
      expect(presenter.canIncrement.value, isFalse);

      presenter.increment(); // Should not increment further
      expect(presenter.quantity.value, 2);
    });

    test('should decrement and call callback when possible', () {
      int? changedValue;
      final presenter = QuantityInputPresenter(
        initialQuantity: 2,
        maxQuantity: 10,
        onQuantityChanged: (val) => changedValue = val,
      );

      presenter.decrement();
      expect(presenter.quantity.value, 1);
      expect(changedValue, 1);
      expect(presenter.canDecrement.value, isFalse);

      presenter.decrement(); // Should not decrement further
      expect(presenter.quantity.value, 1);
    });

    test('setQuantity should clamp value', () {
      final presenter = QuantityInputPresenter(
        initialQuantity: 1,
        maxQuantity: 5,
        onQuantityChanged: (_) {},
      );

      presenter.setQuantity(10);
      expect(presenter.quantity.value, 5);

      presenter.setQuantity(0);
      expect(presenter.quantity.value, 1);
    });
  });
}
