import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import '../../../../../fakers/product_faker.dart';
import '../../../../../fakers/sku_faker.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/services.dart';
import 'package:sertton/core/global/interfaces/cache_driver.dart';
import 'package:sertton/drivers/cache-driver/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product_screen_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class MockCatalogService extends Mock implements CatalogService {}

class MockCacheDriver extends Mock implements CacheDriver {}

void main() {
  late MockCatalogService catalogService;
  late MockCacheDriver cacheDriver;
  const productId = '123';

  setUp(() {
    catalogService = MockCatalogService();
    cacheDriver = MockCacheDriver();

    when(() => cacheDriver.get(any())).thenReturn(null);
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          catalogServiceProvider.overrideWithValue(catalogService),
          cacheDriverProvider.overrideWithValue(cacheDriver),
        ],
        child: const ProductScreenView(productId: productId),
      ),
    );
  }

  group('ProductScreenView', () {
    testWidgets('should render full product details on success', (
      tester,
    ) async {
      final product = ProductFaker.fakeDto(
        id: productId,
        name: 'Awesome Product',
        description: 'Description content',
        specifications: 'Specs content',
        skus: [
          SkuFaker.fakeDto(
            skuCode: 'SKU1',
            salePrice: 100.0,
            discountPrice: 80.0,
            imageUrl: '',
            variations: [],
            stock: 10,
          ),
        ],
        imageUrl: '',
      );

      when(
        () => catalogService.fetchProduct(productId),
      ).thenAnswer((_) async => RestResponse(body: product));

      when(
        () => catalogService.fetchSimiliarProducts(any()),
      ).thenAnswer((_) async => RestResponse(body: []));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
        // Wait for service to return
        await tester.pump(); // Start fetch
        await tester.pump(); // Handle response
        await tester.pumpAndSettle();

        expect(find.text('Awesome Product'), findsOneWidget);
        expect(find.text('ADICIONAR AO CARRINHO'), findsOneWidget);
      });
    });

    testWidgets('should show error state on failure', (tester) async {
      when(() => catalogService.fetchProduct(productId)).thenAnswer(
        (_) async => RestResponse(statusCode: 500, errorMessage: 'Error'),
      );

      await tester.pumpWidget(createWidget());
      await tester.pump();
      await tester.pump();

      expect(find.text('Erro ao carregar produto'), findsOneWidget);
    });
  });
}
