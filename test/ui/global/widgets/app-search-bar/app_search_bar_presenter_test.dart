import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/app_search_bar_presenter.dart';

class MockOnSubmitted extends Mock {
  void call(String value);
}

class MockOnTap extends Mock {
  void call();
}

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late MockOnSubmitted onSubmitted;
  late MockOnTap onTap;
  late MockNavigationDriver navigationDriver;

  setUp(() {
    onSubmitted = MockOnSubmitted();
    onTap = MockOnTap();
    navigationDriver = MockNavigationDriver();
  });

  group('AppSearchBarPresenter', () {
    test(
      'should call onSubmitted when submit is called and readOnly is false',
      () {
        final presenter = AppSearchBarPresenter(
          navigationDriver,
          onSubmitted: onSubmitted.call,
          onTap: onTap.call,
          readOnly: false,
        );

        presenter.submit('search term');

        verify(() => onSubmitted('search term')).called(1);
        verifyNever(() => onTap());
        verifyNever(
          () => navigationDriver.goTo(any(), data: any(named: 'data')),
        );
      },
    );

    test('should call onTap when submit is called and readOnly is true', () {
      final presenter = AppSearchBarPresenter(
        navigationDriver,
        onSubmitted: onSubmitted.call,
        onTap: onTap.call,
        readOnly: true,
      );

      presenter.submit('search term');

      verify(() => onTap()).called(1);
      verifyNever(() => onSubmitted(any()));
      verifyNever(() => navigationDriver.goTo(any(), data: any(named: 'data')));
    });

    test('should use default navigation behavior when onSubmitted is null', () {
      final presenter = AppSearchBarPresenter(
        navigationDriver,
        onSubmitted: null,
        readOnly: false,
      );

      presenter.submit('search term');

      verify(
        () => navigationDriver.goTo(
          Routes.catalog,
          data: {'focusSearch': false, 'initialQuery': 'search term'},
        ),
      ).called(1);
    });
    group('Search Default Behavior', () {
      test(
        'should use default navigation behavior with focusSearch true when term is empty',
        () {
          final presenter = AppSearchBarPresenter(
            navigationDriver,
            onSubmitted: null,
            readOnly: false,
          );

          presenter.submit('');

          verify(
            () => navigationDriver.goTo(
              Routes.catalog,
              data: {'focusSearch': true, 'initialQuery': ''},
            ),
          ).called(1);
        },
      );
    });
  });
}
