import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';

import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';
import 'package:sertton/ui/institutional/widgets/screens/about_company/about_company_presenter.dart';
import 'package:sertton/ui/institutional/widgets/screens/about_company/about_company_view.dart';

class MockAboutCompanyPresenter extends Mock implements AboutCompanyPresenter {}

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late MockAboutCompanyPresenter presenter;
  late MockNavigationDriver navigationDriver;

  setUp(() {
    presenter = MockAboutCompanyPresenter();
    navigationDriver = MockNavigationDriver();

    // Stub methods if necessary, e.g. void methods
    when(() => presenter.openContact(any())).thenAnswer((_) async {});
    when(() => navigationDriver.canGoBack()).thenReturn(true);
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          aboutCompanyPresenterProvider.overrideWithValue(presenter),
          navigationDriverProvider.overrideWithValue(navigationDriver),
        ],
        child: const AboutCompanyScreenView(),
      ),
    );
  }

  group('AboutCompanyScreenView', () {
    testWidgets('should render company info', (tester) async {
      await tester.pumpWidget(createWidget());

      const info = InstitutionalContent.companyInfo;
      expect(find.text(info.name), findsOneWidget);
      expect(find.text(info.description), findsOneWidget);
      expect(find.text('Contato'), findsOneWidget);
      expect(find.text(info.email), findsOneWidget);
      expect(find.text(info.phone), findsOneWidget);
    });

    testWidgets('should call openContact when email is tapped', (tester) async {
      await tester.pumpWidget(createWidget());
      const info = InstitutionalContent.companyInfo;

      await tester.tap(find.text(info.email));
      verify(() => presenter.openContact('mailto:${info.email}')).called(1);
    });

    testWidgets('should call openContact when phone is tapped', (tester) async {
      await tester.pumpWidget(createWidget());
      const info = InstitutionalContent.companyInfo;

      await tester.tap(find.text(info.phone));
      verify(() => presenter.openContact('tel:${info.phone}')).called(1);
    });
  });
}
