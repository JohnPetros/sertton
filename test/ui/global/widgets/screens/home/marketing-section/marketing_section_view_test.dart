import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import '../../../../../../fakers/banner_faker.dart';
import '../../../../../../fakers/collection_faker.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/marketing/interfaces/marketing_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/services.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-banner-skeleton/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-collection-skeleton/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing_section_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing_section_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MockMarketingSectionPresenter extends Mock
    implements MarketingSectionPresenter {}

class MockCatalogService extends Mock implements CatalogService {}

class MockMarketingService extends Mock implements MarketingService {}

void main() {
  late MockMarketingSectionPresenter presenter;
  late MockCatalogService catalogService;
  late MockMarketingService marketingService;

  setUp(() {
    presenter = MockMarketingSectionPresenter();
    catalogService = MockCatalogService();
    marketingService = MockMarketingService();

    when(() => presenter.items).thenReturn(signal([]));
    when(() => presenter.isLoading).thenReturn(signal(false));
    when(() => presenter.error).thenReturn(signal(null));

    when(
      () => catalogService.fetchProductsByCollection(any()),
    ).thenAnswer((_) async => RestResponse(body: [], statusCode: 200));
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          marketingSectionPresenterProvider.overrideWithValue(presenter),
          catalogServiceProvider.overrideWithValue(catalogService),
          marketingServiceProvider.overrideWithValue(marketingService),
        ],
        child: const SingleChildScrollView(child: MarketingSectionView()),
      ),
    );
  }

  testWidgets('should show initial skeletons when loading and empty', (
    tester,
  ) async {
    when(() => presenter.isLoading).thenReturn(signal(true));

    await tester.pumpWidget(createWidget());

    expect(find.byType(MarketingCollectionSkeleton), findsAtLeastNWidgets(1));
    expect(find.byType(MarketingBannerSkeleton), findsOneWidget);
  });

  testWidgets('should show error message', (tester) async {
    when(() => presenter.error).thenReturn(signal('Erro'));

    await tester.pumpWidget(createWidget());

    expect(find.text("Erro ao carregar conteúdo"), findsOneWidget);
  });

  testWidgets('should show interleaved list of items', (tester) async {
    tester.view.physicalSize = const Size(1200, 800);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.resetPhysicalSize);

    final banner = BannerFaker.fakeDto();
    final collection = CollectionFaker.fakeDto();

    when(
      () => presenter.items,
    ).thenReturn(signal([CollectionItem(collection), BannerItem(banner)]));

    await mockNetworkImagesFor(() async {
      await tester.pumpWidget(createWidget());

      expect(find.text(collection.name), findsOneWidget);
      expect(find.byType(Image), findsWidgets);
    });
  });
}
