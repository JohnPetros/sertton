import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/app_search_bar_presenter.dart';

class MockOnSubmitted extends Mock {
  void call(String value);
}

class MockOnTap extends Mock {
  void call();
}

void main() {
  late MockOnSubmitted onSubmitted;
  late MockOnTap onTap;

  setUp(() {
    onSubmitted = MockOnSubmitted();
    onTap = MockOnTap();
  });

  group('AppSearchBarPresenter', () {
    test(
      'should call onSubmitted when submit is called and readOnly is false',
      () {
        final presenter = AppSearchBarPresenter(
          onSubmitted: onSubmitted.call,
          onTap: onTap.call,
          readOnly: false,
        );

        presenter.submit('search term');

        verify(() => onSubmitted('search term')).called(1);
        verifyNever(() => onTap());
      },
    );

    test('should call onTap when submit is called and readOnly is true', () {
      final presenter = AppSearchBarPresenter(
        onSubmitted: onSubmitted.call,
        onTap: onTap.call,
        readOnly: true,
      );

      presenter.submit('search term');

      verify(() => onTap()).called(1);
      verifyNever(() => onSubmitted(any()));
    });
  });
}
