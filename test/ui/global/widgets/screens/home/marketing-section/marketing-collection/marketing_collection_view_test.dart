import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/global/interfaces/internet_connection_driver.dart';
import 'package:sertton/drivers/internet-connection-driver/index.dart';
import '../../../../../../../fakers/collection_faker.dart';
import '../../../../../../../fakers/product_faker.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-collection/marketing_collection_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-collection/marketing_collection_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MockMarketingCollectionPresenter extends Mock
    implements MarketingCollectionPresenter {}

class MockInternetConnectionDriver extends Mock
    implements InternetConnectionDriver {}

void main() {
  late MockMarketingCollectionPresenter presenter;
  late CollectionDto collection;
  late MockInternetConnectionDriver mockConnectionDriver;

  setUp(() {
    presenter = MockMarketingCollectionPresenter();
    collection = CollectionFaker.fakeDto();
    mockConnectionDriver = MockInternetConnectionDriver();

    when(
      () => mockConnectionDriver.hasInternetAccess(),
    ).thenAnswer((_) async => true);
    when(
      () => mockConnectionDriver.onStatusChange(),
    ).thenAnswer((_) => const Stream.empty());

    when(() => presenter.products).thenReturn(signal([]));
    when(() => presenter.isLoading).thenReturn(signal(false));
    when(() => presenter.error).thenReturn(signal(null));
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          marketingCollectionPresenterProvider(
            collection.id,
          ).overrideWithValue(presenter),
          internetConnectionDriverProvider.overrideWithValue(
            mockConnectionDriver,
          ),
        ],
        child: SingleChildScrollView(
          child: MarketingCollectionView(collection: collection),
        ),
      ),
    );
  }

  testWidgets('should show collection name', (tester) async {
    await tester.pumpWidget(createWidget());
    expect(find.text(collection.name), findsOneWidget);
  });

  testWidgets('should show skeletons when loading', (tester) async {
    when(() => presenter.isLoading).thenReturn(signal(true));

    await tester.pumpWidget(createWidget());

    expect(find.byType(SizedBox), findsWidgets); // Skeletons are in SizedBoxes
  });

  testWidgets('should show products when loaded', (tester) async {
    tester.view.physicalSize = const Size(1200, 800);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.resetPhysicalSize);

    final products = ProductFaker.fakeManyDto(count: 2);
    when(() => presenter.products).thenReturn(signal(products));

    await mockNetworkImagesFor(() async {
      await tester.pumpWidget(createWidget());
      expect(find.text(products[0].name), findsOneWidget);
      expect(find.text(products[1].name), findsOneWidget);
    });
  });
}
