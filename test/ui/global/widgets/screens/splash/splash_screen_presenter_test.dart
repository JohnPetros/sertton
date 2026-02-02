import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/ui/global/widgets/screens/splash/splash_screen_presenter.dart';

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late MockNavigationDriver navigationDriver;

  setUp(() {
    navigationDriver = MockNavigationDriver();
  });

  group('SplashScreenPresenter', () {
    testWidgets('should navigate to home after 2 seconds', (tester) async {
      final presenter = SplashScreenPresenter(navigationDriver);

      presenter.init();

      verifyNever(() => navigationDriver.goTo(Routes.home));

      await tester.pump(const Duration(seconds: 2));

      verify(() => navigationDriver.goTo(Routes.home)).called(1);
    });
  });
}
