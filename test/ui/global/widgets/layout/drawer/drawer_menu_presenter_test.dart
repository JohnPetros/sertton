import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:sertton/ui/global/widgets/layout/drawer/drawer_menu_presenter.dart';

class MockNavigationDriver extends Mock implements NavigationDriver {}

class MockUrlDriver extends Mock implements UrlDriver {}

void main() {
  late MockNavigationDriver navigationDriver;
  late MockUrlDriver urlDriver;
  late DrawerMenuPresenter presenter;

  setUp(() {
    navigationDriver = MockNavigationDriver();
    urlDriver = MockUrlDriver();
    presenter = DrawerMenuPresenter(
      navigation: navigationDriver,
      urlDriver: urlDriver,
    );
  });

  group('DrawerMenuPresenter', () {
    test('navigateTo should call navigation.go with correct route', () {
      const route = '/test-route';
      when(() => navigationDriver.go(route)).thenAnswer((_) async {});

      presenter.navigateTo(route);

      verify(() => navigationDriver.go(route)).called(1);
    });

    group('openUrl', () {
      const url = 'https://example.com';
      final uri = Uri.parse(url);

      test('should launch url when canLaunch is true', () async {
        when(() => urlDriver.canLaunch(uri)).thenAnswer((_) async => true);
        when(() => urlDriver.launch(uri)).thenAnswer((_) async => true);

        await presenter.openUrl(url);

        verify(() => urlDriver.canLaunch(uri)).called(1);
        verify(() => urlDriver.launch(uri)).called(1);
      });

      test(
        'should not launch url when canLaunch is false and no fallback provided',
        () async {
          when(() => urlDriver.canLaunch(uri)).thenAnswer((_) async => false);

          await presenter.openUrl(url);

          verify(() => urlDriver.canLaunch(uri)).called(1);
          verifyNever(() => urlDriver.launch(any()));
        },
      );

      test(
        'should launch fallback url when primary url cannot launch',
        () async {
          const fallbackUrl = 'https://fallback.com';
          final fallbackUri = Uri.parse(fallbackUrl);

          when(() => urlDriver.canLaunch(uri)).thenAnswer((_) async => false);
          when(
            () => urlDriver.canLaunch(fallbackUri),
          ).thenAnswer((_) async => true);
          when(
            () => urlDriver.launch(fallbackUri),
          ).thenAnswer((_) async => true);

          await presenter.openUrl(url, fallbackUrl: fallbackUrl);

          verify(() => urlDriver.canLaunch(uri)).called(1);
          verify(() => urlDriver.canLaunch(fallbackUri)).called(1);
          verify(() => urlDriver.launch(fallbackUri)).called(1);
        },
      );

      test(
        'should not launch anything when both primary and fallback urls cannot launch',
        () async {
          const fallbackUrl = 'https://fallback.com';
          final fallbackUri = Uri.parse(fallbackUrl);

          when(() => urlDriver.canLaunch(uri)).thenAnswer((_) async => false);
          when(
            () => urlDriver.canLaunch(fallbackUri),
          ).thenAnswer((_) async => false);

          await presenter.openUrl(url, fallbackUrl: fallbackUrl);

          verify(() => urlDriver.canLaunch(uri)).called(1);
          verify(() => urlDriver.canLaunch(fallbackUri)).called(1);
          verifyNever(() => urlDriver.launch(any()));
        },
      );
    });
  });
}
