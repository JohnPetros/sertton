import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/cart/cart-item-card/cart_item_card_view.dart';

void main() {
  Widget createWidget({
    required Function(int) onQuantityChanged,
    required VoidCallback onRemove,
  }) {
    return ShadcnApp(
      home: Scaffold(
        child: CartItemCardView(
          imageUrl: 'https://example.com/image.png',
          skuCode: 'SKU123',
          name: 'Test Product',
          variationName: 'Color',
          variationValue: 'Red',
          salePrice: 100.0,
          discountPrice: 80.0,
          quantity: 2,
          maxQuantity: 10,
          onQuantityChanged: onQuantityChanged,
          onRemove: onRemove,
        ),
      ),
    );
  }

  group('CartItemCardView', () {
    testWidgets('should render correctly with given props', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(
          createWidget(onQuantityChanged: (_) {}, onRemove: () {}),
        );

        expect(find.text('SKU: SKU123'), findsOneWidget);
        expect(find.text('Test Product'), findsOneWidget);
        expect(find.text('• Color: Red'), findsOneWidget);
        expect(find.text('R\$ 100.00'), findsOneWidget); // Original price
        expect(find.text('R\$ 80.00'), findsOneWidget); // Discount price
        expect(find.text('2'), findsOneWidget); // Quantity
      });
    });

    testWidgets('should call onRemove when trash icon is pressed', (
      tester,
    ) async {
      bool removeCalled = false;
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(
          createWidget(
            onQuantityChanged: (_) {},
            onRemove: () => removeCalled = true,
          ),
        );

        await tester.tap(find.byIcon(LucideIcons.trash2));
        expect(removeCalled, isTrue);
      });
    });
  });
}
