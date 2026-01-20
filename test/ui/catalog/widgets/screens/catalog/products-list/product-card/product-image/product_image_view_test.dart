import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' hide Theme, Scaffold;
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/product_image_presenter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/product_image_view.dart';

class MockProductImagePresenter extends Mock implements ProductImagePresenter {}

void main() {
  group('ProductImageView', () {
    late MockProductImagePresenter presenter;

    setUp(() {
      presenter = MockProductImagePresenter();
      when(() => presenter.hasError).thenReturn(signal(false));
    });

    Widget createWidget() {
      return ShadcnApp(
        home: ProviderScope(
          overrides: [
            productImagePresenterProvider.overrideWith((ref, _) => presenter),
          ],
          child: const Scaffold(
            body: ProductImageView(imageUrl: 'https://example.com/image.jpg'),
          ),
        ),
      );
    }

    testWidgets('should show Image.network when no error', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        expect(find.byType(Image), findsOneWidget);
        expect(find.byIcon(Icons.image_not_supported), findsNothing);
      });
    });

    testWidgets('should show error icon when hasError signal is true', (
      tester,
    ) async {
      when(() => presenter.hasError).thenReturn(signal(true));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        expect(find.byType(Image), findsNothing);
        expect(find.byIcon(Icons.image_not_supported), findsOneWidget);
      });
    });
  });
}
