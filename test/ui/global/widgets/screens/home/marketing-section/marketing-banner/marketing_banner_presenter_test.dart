import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-banner/marketing_banner_presenter.dart';
import '../../../../../../../fakers/banner_faker.dart';

void main() {
  group('MarketingBannerPresenter', () {
    test('should initialize imageUrl with https: prefix', () {
      final banner = BannerFaker.fakeDto(
        props: (id: '1', imageUrl: '//example.com/image.jpg'),
      );
      final presenter = MarketingBannerPresenter(banner);

      expect(presenter.imageUrl.value, 'https://example.com/image.jpg');
    });
  });
}
