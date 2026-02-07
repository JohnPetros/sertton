import 'package:flutter/material.dart'
    hide Theme, Scaffold, ThemeData, CircularProgressIndicator;
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals.dart';
import 'package:sertton/ui/global/widgets/screens/offline/offline_screen_view.dart';
import 'package:sertton/ui/global/widgets/screens/offline/offline_screen_presenter.dart';
import 'package:network_image_mock/network_image_mock.dart';

class MockOfflineScreenPresenter extends Mock
    implements OfflineScreenPresenter {}

void main() {
  late MockOfflineScreenPresenter presenter;

  setUp(() {
    presenter = MockOfflineScreenPresenter();
    when(() => presenter.isChecking).thenReturn(signal<bool>(false));
    when(() => presenter.tryReconnect()).thenAnswer((_) async {});
  });

  Widget createWidget() {
    return ShadcnApp(
      theme: ThemeData(colorScheme: ColorSchemes.lightBlue, radius: 0.5),
      home: ProviderScope(
        overrides: [
          offlineScreenPresenterProvider.overrideWithValue(presenter),
        ],
        child: const Material(child: OfflineScreenView()),
      ),
    );
  }

  group('OfflineScreenView', () {
    testWidgets('should render offline message and icon', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        expect(find.byIcon(LucideIcons.wifiOff), findsOneWidget);
        expect(find.text('Sem conexão com a internet!'), findsOneWidget);
        expect(
          find.text('Verifique sua conexão para seguir navegando.'),
          findsOneWidget,
        );
      });
    });

    testWidgets('should render retry button with correct text', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        expect(find.text('Tentar novamente'), findsOneWidget);
        expect(find.byType(PrimaryButton), findsOneWidget);
      });
    });

    testWidgets('should call tryReconnect when retry button is tapped', (
      tester,
    ) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        final button = find.byType(PrimaryButton);
        await tester.tap(button);
        await tester.pumpAndSettle();

        verify(() => presenter.tryReconnect()).called(1);
      });
    });

    testWidgets('should show loading indicator when checking connection', (
      tester,
    ) async {
      when(() => presenter.isChecking).thenReturn(signal<bool>(true));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        expect(find.byType(CircularProgressIndicator), findsOneWidget);
        expect(find.text('Tentar novamente'), findsNothing);
      });
    });

    testWidgets('should disable button when checking connection', (
      tester,
    ) async {
      when(() => presenter.isChecking).thenReturn(signal<bool>(true));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        final button = find.byType(PrimaryButton);
        expect(button, findsOneWidget);

        final primaryButton = tester.widget<PrimaryButton>(button);
        expect(primaryButton.onPressed, isNull);
      });
    });

    testWidgets('should enable button when not checking connection', (
      tester,
    ) async {
      when(() => presenter.isChecking).thenReturn(signal<bool>(false));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        final button = find.byType(PrimaryButton);
        expect(button, findsOneWidget);

        final primaryButton = tester.widget<PrimaryButton>(button);
        expect(primaryButton.onPressed, isNotNull);
      });
    });

    testWidgets('should update UI when isChecking changes', (tester) async {
      final isCheckingSignal = signal<bool>(false);
      when(() => presenter.isChecking).thenReturn(isCheckingSignal);

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        expect(find.text('Tentar novamente'), findsOneWidget);
        expect(find.byType(CircularProgressIndicator), findsNothing);

        isCheckingSignal.value = true;
        await tester.pump();

        expect(find.byType(CircularProgressIndicator), findsOneWidget);
        expect(find.text('Tentar novamente'), findsNothing);

        isCheckingSignal.value = false;
        await tester.pump();

        expect(find.text('Tentar novamente'), findsOneWidget);
        expect(find.byType(CircularProgressIndicator), findsNothing);
      });
    });
  });
}
