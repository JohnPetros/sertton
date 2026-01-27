import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/constants/sertton_contacts.dart';
import 'package:sertton/ui/global/widgets/layout/drawer/drawer_menu_presenter.dart';
import 'package:sertton/ui/global/widgets/layout/drawer/drawer_menu_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

class MockDrawerMenuPresenter extends Mock implements DrawerMenuPresenter {}

void main() {
  late MockDrawerMenuPresenter presenter;

  setUp(() {
    presenter = MockDrawerMenuPresenter();
    when(
      () => presenter.openUrl(any(), fallbackUrl: any(named: 'fallbackUrl')),
    ).thenAnswer((_) async {});
    when(() => presenter.navigateTo(any())).thenAnswer((_) async {});
  });

  Widget createWidget() {
    return shadcn.ShadcnApp(
      home: ProviderScope(
        overrides: [
          drawerMenuPresenterProvider.overrideWithValue(presenter),
          appVersionProvider.overrideWith((ref) => 'Versão Teste'),
        ],
        child: Scaffold(
          drawer: const DrawerMenuView(),
          body: Builder(
            builder: (context) {
              return Center(
                child: TextButton(
                  onPressed: () {
                    Scaffold.of(context).openDrawer();
                  },
                  child: const Text('Open Drawer'),
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  group('DrawerMenuView', () {
    testWidgets('should render all sections and links', (tester) async {
      await tester.pumpWidget(createWidget());

      // Open the drawer
      await tester.tap(find.text('Open Drawer'));
      await tester.pumpAndSettle();

      // Verify Headers
      expect(find.text('FALE CONOSCO'), findsOneWidget);
      expect(find.text('INSTITUCIONAL'), findsOneWidget);
      expect(find.text('Versão Teste'), findsOneWidget);

      // Verify Contact Links
      expect(find.text(SerttonContacts.whatsappLabel), findsOneWidget);
      expect(find.text(SerttonContacts.landlineLabel), findsOneWidget);
      expect(find.text(SerttonContacts.emailAddress), findsOneWidget);

      // Verify Institutional Links
      expect(find.text('Políticas de privacidade'), findsOneWidget);
      expect(find.text('Termos e condições'), findsOneWidget);
      expect(find.text('Sobre a Sertton Industrial'), findsOneWidget);
    });

    testWidgets('should call navigateTo when clicking institutional links', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      // Open the drawer
      await tester.tap(find.text('Open Drawer'));
      await tester.pumpAndSettle();

      // Tap Privacy Policy
      await tester.tap(find.text('Políticas de privacidade'));
      await tester.pumpAndSettle(); // Allow pop animation

      verify(() => presenter.navigateTo(Routes.privacyPolicy)).called(1);

      // Re-open (since it popped)
      await tester.tap(find.text('Open Drawer'));
      await tester.pumpAndSettle();

      // Tap Terms of Use
      await tester.tap(find.text('Termos e condições'));
      await tester.pumpAndSettle();

      verify(() => presenter.navigateTo(Routes.termsOfUse)).called(1);

      // Re-open
      await tester.tap(find.text('Open Drawer'));
      await tester.pumpAndSettle();

      // Tap About
      await tester.tap(find.text('Sobre a Sertton Industrial'));
      await tester.pumpAndSettle();

      verify(() => presenter.navigateTo(Routes.about)).called(1);
    });

    testWidgets('should call openUrl when clicking contact links', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      // Open the drawer
      await tester.tap(find.text('Open Drawer'));
      await tester.pumpAndSettle();

      // Tap WhatsApp
      await tester.tap(find.text(SerttonContacts.whatsappLabel));
      await tester.pumpAndSettle();

      verify(
        () => presenter.openUrl(
          SerttonContacts.whatsappUrl,
          fallbackUrl: SerttonContacts.whatsappHttpsUrl,
        ),
      ).called(1);

      // Re-open
      await tester.tap(find.text('Open Drawer'));
      await tester.pumpAndSettle();

      // Tap Landline
      await tester.tap(find.text(SerttonContacts.landlineLabel));
      await tester.pumpAndSettle();

      verify(() => presenter.openUrl(SerttonContacts.landlineUrl)).called(1);

      // Re-open
      await tester.tap(find.text('Open Drawer'));
      await tester.pumpAndSettle();

      // Tap Email
      await tester.tap(find.text(SerttonContacts.emailAddress));
      await tester.pumpAndSettle();

      verify(() => presenter.openUrl(SerttonContacts.emailUrl)).called(1);
    });
  });
}
