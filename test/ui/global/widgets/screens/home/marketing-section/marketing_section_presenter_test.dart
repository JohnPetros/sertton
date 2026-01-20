import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/marketing/interfaces/marketing_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import '../../../../../../fakers/banner_faker.dart';
import '../../../../../../fakers/collection_faker.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing_section_presenter.dart';

class MockMarketingService extends Mock implements MarketingService {}

class MockCatalogService extends Mock implements CatalogService {}

void main() {
  late MockMarketingService marketingService;
  late MockCatalogService catalogService;

  setUp(() {
    marketingService = MockMarketingService();
    catalogService = MockCatalogService();
  });

  group('MarketingSectionPresenter', () {
    test('should load and interleave content correctly', () async {
      final banners = BannerFaker.fakeManyDto(
        count: 10,
      ); // sublist(2,5) will get 3
      final collections = CollectionFaker.fakeManyDto(count: 2); // reversed

      when(
        () => marketingService.fetchBanners(),
      ).thenAnswer((_) async => RestResponse(body: banners, statusCode: 200));
      when(() => catalogService.fetchCollections()).thenAnswer(
        (_) async => RestResponse(body: collections, statusCode: 200),
      );

      final presenter = MarketingSectionPresenter(
        marketingService,
        catalogService,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.items.value, isNotEmpty);

      // Verification of interleaving logic:
      // banners sublist(2, 5) => 3 banners
      // collections reversed => 2 collections
      // Logic: collection, banner, collection, banner, banner

      final items = presenter.items.value;
      expect(items[0], isA<CollectionItem>());
      expect(items[1], isA<BannerItem>());
      expect(items[2], isA<CollectionItem>());
      expect(items[3], isA<BannerItem>());
      expect(items[4], isA<BannerItem>());
    });

    test('should handle partial failure', () async {
      when(
        () => marketingService.fetchBanners(),
      ).thenAnswer((_) async => RestResponse(body: null, statusCode: 500));
      when(
        () => catalogService.fetchCollections(),
      ).thenAnswer((_) async => RestResponse(body: [], statusCode: 200));

      final presenter = MarketingSectionPresenter(
        marketingService,
        catalogService,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.error.value, 'Houve um erro ao carregar o conteúdo.');
    });
  });
}
