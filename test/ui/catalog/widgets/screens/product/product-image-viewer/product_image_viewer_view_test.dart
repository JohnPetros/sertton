import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-image-viewer/product_image_viewer_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

void main() {
  const imageUrl = 'https://example.com/image.jpg';
  const productName = 'Test Product';

  Widget createWidget() {
    return const ShadcnApp(
      home: Scaffold(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: 300,
                width: 300,
                child: ProductImageViewerView(
                  imageUrl: imageUrl,
                  productName: productName,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  group('ProductImageViewerView', () {
    testWidgets('should render image and zoom indicator', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
        await tester.pumpAndSettle();

        expect(find.byType(Image), findsWidgets);
        expect(find.text('Pressione para zoom'), findsOneWidget);
        expect(find.byIcon(RadixIcons.zoomIn), findsOneWidget);
      });
    });

    testWidgets('should show zoom dialog when tapped', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
        await tester.pumpAndSettle();

        // Tap the image or the zoom indicator container which is definitely hit-testable
        await tester.tap(find.text('Pressione para zoom'));
        await tester.pumpAndSettle();

        expect(find.byType(InteractiveViewer), findsOneWidget);
      });
    });
  });
}
