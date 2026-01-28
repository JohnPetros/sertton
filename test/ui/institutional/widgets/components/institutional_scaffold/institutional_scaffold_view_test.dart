import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/ui/institutional/widgets/components/institutional_scaffold/institutional_scaffold_presenter.dart';
import 'package:sertton/ui/institutional/widgets/components/institutional_scaffold/institutional_scaffold_view.dart';

class MockInstitutionalScaffoldPresenter extends Mock
    implements InstitutionalScaffoldPresenter {}

void main() {
  late MockInstitutionalScaffoldPresenter presenter;

  setUp(() {
    presenter = MockInstitutionalScaffoldPresenter();
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          institutionalScaffoldPresenterProvider.overrideWithValue(presenter),
        ],
        child: const InstitutionalScaffoldView(body: Text('Body Content')),
      ),
    );
  }

  group('InstitutionalScaffoldView', () {
    testWidgets('should render body content', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Body Content'), findsOneWidget);
    });

    testWidgets('should call onBack when back button is pressed', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      final backButton = find.byIcon(LucideIcons.chevronLeft);
      expect(backButton, findsOneWidget);

      await tester.tap(backButton);
      verify(() => presenter.onBack()).called(1);
    });
  });
}
