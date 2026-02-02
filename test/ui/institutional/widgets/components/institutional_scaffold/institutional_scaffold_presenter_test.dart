import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/ui/institutional/widgets/components/institutional_scaffold/institutional_scaffold_presenter.dart';

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late MockNavigationDriver navigationDriver;
  late InstitutionalScaffoldPresenter presenter;

  setUp(() {
    navigationDriver = MockNavigationDriver();
    presenter = InstitutionalScaffoldPresenter(navigationDriver);
  });

  group('InstitutionalScaffoldPresenter', () {
    test('should go back when canGoBack is true', () {
      when(() => navigationDriver.canGoBack()).thenReturn(true);

      presenter.onBack();

      verify(() => navigationDriver.canGoBack()).called(1);
      verify(() => navigationDriver.goBack()).called(1);
      verifyNever(() => navigationDriver.goTo(any()));
    });

    test('should go to root when canGoBack is false', () {
      when(() => navigationDriver.canGoBack()).thenReturn(false);

      presenter.onBack();

      verify(() => navigationDriver.canGoBack()).called(1);
      verify(() => navigationDriver.goTo('/')).called(1);
      verifyNever(() => navigationDriver.goBack());
    });
  });
}
