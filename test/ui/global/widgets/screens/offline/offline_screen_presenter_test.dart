import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/global/interfaces/internet_connection_driver.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/ui/global/widgets/screens/offline/offline_screen_presenter.dart';

class MockNavigationDriver extends Mock implements NavigationDriver {}

class MockInternetConnectionDriver extends Mock
    implements InternetConnectionDriver {}

void main() {
  late MockNavigationDriver navigationDriver;
  late MockInternetConnectionDriver connectionDriver;
  late OfflineScreenPresenter presenter;

  setUp(() {
    navigationDriver = MockNavigationDriver();
    connectionDriver = MockInternetConnectionDriver();
    presenter = OfflineScreenPresenter(navigationDriver, connectionDriver);
  });

  group('OfflineScreenPresenter', () {
    group('tryReconnect', () {
      test('should set isChecking to true while checking connection', () async {
        when(() => connectionDriver.hasInternetAccess()).thenAnswer(
          (_) async =>
              Future.delayed(const Duration(milliseconds: 100), () => false),
        );

        expect(presenter.isChecking.value, false);
        expect(presenter.isIdle.value, true);

        final future = presenter.tryReconnect();

        await Future.delayed(Duration.zero);

        expect(presenter.isChecking.value, true);
        expect(presenter.isIdle.value, false);

        await future;

        expect(presenter.isChecking.value, false);
        expect(presenter.isIdle.value, true);
      });

      test('should navigate to home when connection is restored', () async {
        when(
          () => connectionDriver.hasInternetAccess(),
        ).thenAnswer((_) async => true);

        await presenter.tryReconnect();

        verify(() => navigationDriver.goTo(Routes.home)).called(1);
      });

      test(
        'should not navigate when connection is still unavailable',
        () async {
          when(
            () => connectionDriver.hasInternetAccess(),
          ).thenAnswer((_) async => false);

          await presenter.tryReconnect();

          verifyNever(() => navigationDriver.goTo(any()));
        },
      );

      test('should reset isChecking to false even when error occurs', () async {
        when(
          () => connectionDriver.hasInternetAccess(),
        ).thenThrow(Exception('Connection error'));

        expect(presenter.isChecking.value, false);

        try {
          await presenter.tryReconnect();
        } catch (_) {}

        expect(presenter.isChecking.value, false);
        expect(presenter.isIdle.value, true);
      });

      test('should not check connection if already checking', () async {
        when(() => connectionDriver.hasInternetAccess()).thenAnswer(
          (_) async =>
              Future.delayed(const Duration(milliseconds: 100), () => true),
        );

        final firstCall = presenter.tryReconnect();

        await Future.delayed(Duration.zero);

        expect(presenter.isChecking.value, true);

        await presenter.tryReconnect();

        verify(() => connectionDriver.hasInternetAccess()).called(1);

        await firstCall;
      });
    });

    group('signals', () {
      test('isIdle should be computed from isChecking', () {
        expect(presenter.isIdle.value, true);

        presenter.isChecking.value = true;
        expect(presenter.isIdle.value, false);

        presenter.isChecking.value = false;
        expect(presenter.isIdle.value, true);
      });
    });
  });
}
