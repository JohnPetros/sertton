import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import '../../../../../../../fakers/banner_faker.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-banner/marketing_banner_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-banner/marketing_banner_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MockMarketingBannerPresenter extends Mock
    implements MarketingBannerPresenter {}

void main() {
  late MockMarketingBannerPresenter presenter;
  late BannerDto banner;

  setUp(() {
    presenter = MockMarketingBannerPresenter();
    banner = BannerFaker.fakeDto();

    when(
      () => presenter.imageUrl,
    ).thenReturn(signal('https://example.com/image.jpg'));
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          marketingBannerPresenterProvider(banner).overrideWithValue(presenter),
        ],
        child: MarketingBannerView(banner: banner),
      ),
    );
  }

  testWidgets('should render MarketingBannerView correctly', (tester) async {
    await mockNetworkImagesFor(() async {
      await tester.pumpWidget(createWidget());

      expect(find.byType(MarketingBannerView), findsOneWidget);
      expect(find.byType(Image), findsOneWidget);
    });
  });
}
