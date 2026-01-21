import 'package:flutter/material.dart'
    hide TextField, Scaffold, CircularProgressIndicator;
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/global/widgets/screens/home/leads-capturer-section/leads_capturer_section_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/leads-capturer-section/leads_capturer_section_view.dart';

class MockLeadsCapturerSectionPresenter extends Mock
    implements LeadsCapturerSectionPresenter {}

void main() {
  late MockLeadsCapturerSectionPresenter presenter;

  setUp(() {
    presenter = MockLeadsCapturerSectionPresenter();

    when(() => presenter.email).thenReturn(signal(''));
    when(() => presenter.isLoading).thenReturn(signal(false));
    when(() => presenter.errorMessage).thenReturn(signal<String?>(null));
    when(() => presenter.successMessage).thenReturn(signal<String?>(null));
    when(() => presenter.submitLead()).thenAnswer((_) async {});
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          leadsCapturerSectionPresenterProvider.overrideWithValue(presenter),
        ],
        child: Scaffold(child: const LeadsCapturerSectionView()),
      ),
    );
  }

  group('LeadsCapturerSectionView', () {
    testWidgets('should render initial state correctly', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(
        find.text('Receba novidades e\nofertas incríveis'),
        findsOneWidget,
      );
      expect(
        find.text(
          'Cadastre-se na nossa newsletter e fique por dentro dos lançamentos exclusivos da loja.',
        ),
        findsOneWidget,
      );
      expect(find.byType(TextField), findsOneWidget);
      expect(find.byType(Button), findsOneWidget);
      expect(find.text('Inscreva-se'), findsOneWidget);
    });

    testWidgets('should update presenter email when text changes', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      await tester.enterText(find.byType(TextField), 'test@example.com');

      expect(presenter.email.value, equals('test@example.com'));
    });

    testWidgets('should call submitLead when button is pressed', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      await tester.tap(find.byType(Button));
      await tester.pump();

      verify(() => presenter.submitLead()).called(1);
    });

    testWidgets('should call submitLead when enter is pressed in TextField', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      await tester.showKeyboard(find.byType(TextField));
      await tester.testTextInput.receiveAction(TextInputAction.done);
      await tester.pump();

      verify(() => presenter.submitLead()).called(1);
    });

    testWidgets('should show loading indicator when isLoading is true', (
      tester,
    ) async {
      when(() => presenter.isLoading).thenReturn(signal(true));

      await tester.pumpWidget(createWidget());

      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      expect(find.text('Inscreva-se'), findsNothing);

      // Verify button is disabled
      final button = tester.widget<Button>(find.byType(Button));
      expect(button.onPressed, isNull);

      // Verify TextField is disabled
      final textField = tester.widget<TextField>(find.byType(TextField));
      expect(textField.enabled, isFalse);
    });

    testWidgets(
      'should show success message when presenter has successMessage',
      (tester) async {
        const message = 'Success Message';
        when(() => presenter.successMessage).thenReturn(signal(message));

        await tester.pumpWidget(createWidget());

        expect(find.text(message), findsOneWidget);
        expect(find.byIcon(Icons.check_circle), findsOneWidget);
      },
    );

    testWidgets('should show error message when presenter has errorMessage', (
      tester,
    ) async {
      const message = 'Error Message';
      when(() => presenter.errorMessage).thenReturn(signal(message));

      await tester.pumpWidget(createWidget());

      expect(find.text(message), findsOneWidget);
      expect(find.byIcon(Icons.error_outline), findsOneWidget);
    });

    testWidgets('should clear controller when presenter email is cleared', (
      tester,
    ) async {
      final emailSignal = signal('initial@test.com');
      when(() => presenter.email).thenReturn(emailSignal);

      await tester.pumpWidget(createWidget());

      // Initial text
      expect(find.text('initial@test.com'), findsOneWidget);

      // Clear signal
      emailSignal.value = '';
      await tester.pump();

      // Verify controller is cleared (via finding the text)
      expect(find.text('initial@test.com'), findsNothing);
    });
  });
}
