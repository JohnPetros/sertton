import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:sertton/ui/institutional/widgets/screens/about_company/about_company_presenter.dart';

class MockUrlDriver extends Mock implements UrlDriver {}

void main() {
  late MockUrlDriver urlDriver;
  late AboutCompanyPresenter presenter;

  setUpAll(() {
    registerFallbackValue(Uri.parse('http://example.com'));
  });

  setUp(() {
    urlDriver = MockUrlDriver();
    presenter = AboutCompanyPresenter(urlDriver);
  });

  group('AboutCompanyPresenter', () {
    const testUrl = 'https://sertton.com.br';

    test('should launch url when canLaunch returns true', () async {
      when(() => urlDriver.canLaunch(any())).thenAnswer((_) async => true);
      when(() => urlDriver.launch(any())).thenAnswer((_) async => {});

      await presenter.openContact(testUrl);

      verify(() => urlDriver.canLaunch(Uri.parse(testUrl))).called(1);
      verify(() => urlDriver.launch(Uri.parse(testUrl))).called(1);
    });

    test('should not launch url when canLaunch returns false', () async {
      when(() => urlDriver.canLaunch(any())).thenAnswer((_) async => false);

      await presenter.openContact(testUrl);

      verify(() => urlDriver.canLaunch(Uri.parse(testUrl))).called(1);
      verifyNever(() => urlDriver.launch(any()));
    });
  });
}
