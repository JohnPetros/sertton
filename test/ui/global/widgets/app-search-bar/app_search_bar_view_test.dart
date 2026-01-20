import 'package:flutter/widgets.dart' show VoidCallback, Widget;
import 'package:flutter/material.dart' show TextInputAction, Icons;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/app_search_bar_presenter.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/app_search_bar_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class MockAppSearchBarPresenter extends Mock implements AppSearchBarPresenter {}

void main() {
  late MockAppSearchBarPresenter presenter;

  setUp(() {
    presenter = MockAppSearchBarPresenter();
    when(() => presenter.submit(any())).thenReturn(null);
  });

  Widget createWidget({
    bool readOnly = false,
    VoidCallback? onTap,
    Function(String)? onSubmitted,
    String? initialValue,
    bool autoFocus = false,
  }) {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          appSearchBarPresenterProvider((
            onSubmitted: onSubmitted,
            onTap: onTap,
            readOnly: readOnly,
          )).overrideWithValue(presenter),
        ],
        child: Scaffold(
          child: AppSearchBarView(
            readOnly: readOnly,
            onTap: onTap,
            onSubmitted: onSubmitted,
            initialValue: initialValue,
            autoFocus: autoFocus,
          ),
        ),
      ),
    );
  }

  testWidgets('should render with initial value', (tester) async {
    await tester.pumpWidget(createWidget(initialValue: 'initial term'));

    expect(find.text('initial term'), findsOneWidget);
  });

  testWidgets('should call presenter.submit when button is pressed', (
    tester,
  ) async {
    await tester.pumpWidget(createWidget());

    await tester.enterText(find.byType(TextField), 'search term');
    await tester.tap(find.byIcon(Icons.search));
    await tester.pump();

    verify(() => presenter.submit('search term')).called(1);
  });

  testWidgets('should call presenter.submit when enter is pressed', (
    tester,
  ) async {
    await tester.pumpWidget(createWidget());

    await tester.enterText(find.byType(TextField), 'search term');
    await tester.testTextInput.receiveAction(TextInputAction.done);
    await tester.pump();

    verify(() => presenter.submit('search term')).called(1);
  });

  testWidgets('should be readOnly when prop is true', (tester) async {
    await tester.pumpWidget(createWidget(readOnly: true));

    final textField = tester.widget<TextField>(find.byType(TextField));
    expect(textField.readOnly, isTrue);
  });

  testWidgets('should call onTap when readOnly is true and field is tapped', (
    tester,
  ) async {
    bool tapped = false;
    await tester.pumpWidget(
      createWidget(
        readOnly: true,
        onTap: () {
          tapped = true;
        },
      ),
    );

    // When readOnly is true, TextField onTap is called.
    // However, our presenter handles the logic.
    // In the View, the TextField onSubmitted/Button onPressed calls presenter.submit.
    // The TextField onTap is passed directly to the widget.

    await tester.tap(find.byType(TextField));
    await tester.pump();

    expect(tapped, isTrue);
  });
}
