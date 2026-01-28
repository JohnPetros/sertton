import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/institutional/widgets/screens/terms_conditions/terms_conditions_presenter.dart';
import 'package:sertton/ui/institutional/widgets/screens/terms_conditions/terms_conditions_view.dart';

class MockTermsConditionsPresenter extends Mock
    implements TermsConditionsPresenter {}

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late MockTermsConditionsPresenter presenter;
  late MockNavigationDriver navigationDriver;

  setUp(() {
    presenter = MockTermsConditionsPresenter();
    navigationDriver = MockNavigationDriver();

    when(() => navigationDriver.canGoBack()).thenReturn(true);
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          termsConditionsPresenterProvider.overrideWithValue(presenter),
          navigationDriverProvider.overrideWithValue(navigationDriver),
        ],
        child: const TermsConditionsScreenView(),
      ),
    );
  }

  group('TermsConditionsScreenView', () {
    testWidgets('should render terms title and accordion items', (
      tester,
    ) async {
      final sections = [
        (title: 'Term 1', content: 'Content 1'),
        (title: 'Term 2', content: 'Content 2'),
      ];
      when(() => presenter.sections).thenReturn(signal(sections));

      await tester.pumpWidget(createWidget());

      // Check header
      expect(find.text('Termos e Condições'), findsOneWidget);

      // Check Accordion Trigger (title)
      expect(find.text('Term 1'), findsOneWidget);
      expect(find.text('Term 2'), findsOneWidget);

      // Notes: Content might not be visible initially if accordion is closed.
      // Shadcn Accordion usually starts closed or depends on setting.
      // Let's assume we need to tap to see content.

      await tester.tap(find.text('Term 1'));
      await tester.pumpAndSettle();

      expect(find.text('Content 1'), findsOneWidget);
    });
  });
}
