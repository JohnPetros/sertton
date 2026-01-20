import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import '../../../../../../../fakers/product_faker.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-collection/marketing_collection_presenter.dart';

class MockCatalogService extends Mock implements CatalogService {}

void main() {
  late MockCatalogService catalogService;
  const collectionId = 'coll_123';

  setUp(() {
    catalogService = MockCatalogService();
  });

  group('MarketingCollectionPresenter', () {
    test('should load products successfully', () async {
      final products = ProductFaker.fakeManyDto(count: 3);
      when(
        () => catalogService.fetchProductsByCollection(collectionId),
      ).thenAnswer((_) async => RestResponse(body: products, statusCode: 200));

      final presenter = MarketingCollectionPresenter(
        catalogService,
        collectionId,
      );

      expect(presenter.isLoading.value, isTrue);

      await Future.delayed(Duration.zero); // Wait for loadProducts

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.products.value, products);
      expect(presenter.error.value, isNull);
    });

    test('should handle error when loading products fails', () async {
      when(
        () => catalogService.fetchProductsByCollection(collectionId),
      ).thenAnswer((_) async => RestResponse(body: null, statusCode: 500));

      final presenter = MarketingCollectionPresenter(
        catalogService,
        collectionId,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.products.value, isEmpty);
      expect(presenter.error.value, 'Erro ao carregar produtos da coleção.');
    });
  });
}
