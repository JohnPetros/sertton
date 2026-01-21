import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import '../../../../../fakers/product_faker.dart';
import '../../../../../fakers/sku_faker.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product_screen_presenter.dart';

class MockCatalogService extends Mock implements CatalogService {}

void main() {
  late ProductScreenPresenter presenter;
  late MockCatalogService catalogService;
  const productId = '123';

  setUp(() {
    catalogService = MockCatalogService();
  });

  group('ProductScreenPresenter', () {
    test('should load product on initialization', () async {
      final product = ProductFaker.fakeDto(
        props: (
          id: productId,
          slug: null,
          skuCode: null,
          name: 'Test Product',
          description: null,
          specifications: null,
          skus: [SkuFaker.fakeDto()],
          imageUrl: null,
          brand: null,
        ),
      );

      when(
        () => catalogService.fetchProduct(productId),
      ).thenAnswer((_) async => RestResponse(body: product));

      presenter = ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
      );

      expect(presenter.isLoading.value, isTrue);

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.product.value, product);
      expect(presenter.selectedSku.value, product.skus.first);
      expect(presenter.hasError.value, isFalse);
    });

    test('should set hasError when fetch fails', () async {
      when(() => catalogService.fetchProduct(productId)).thenAnswer(
        (_) async => RestResponse(statusCode: 500, errorMessage: 'Error'),
      );

      presenter = ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.hasError.value, isTrue);
      expect(presenter.product.value, isNull);
    });

    test('selectSku should update selectedSku and reset quantity', () async {
      final skus = SkuFaker.fakeManyDto(count: 2);
      final product = ProductFaker.fakeDto(
        props: (
          id: productId,
          slug: null,
          skuCode: null,
          name: null,
          description: null,
          specifications: null,
          skus: skus,
          imageUrl: null,
          brand: null,
        ),
      );

      when(
        () => catalogService.fetchProduct(productId),
      ).thenAnswer((_) async => RestResponse(body: product));

      presenter = ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
      );
      await Future.delayed(Duration.zero);

      presenter.updateQuantity(5);
      expect(presenter.quantity.value, 5);

      presenter.selectSku(skus[1]);
      expect(presenter.selectedSku.value, skus[1]);
      expect(presenter.quantity.value, 1);
    });
  });
}
