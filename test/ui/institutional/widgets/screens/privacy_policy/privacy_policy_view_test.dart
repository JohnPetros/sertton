import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/institutional/widgets/screens/privacy_policy/privacy_policy_presenter.dart';
import 'package:sertton/ui/institutional/widgets/screens/privacy_policy/privacy_policy_view.dart';

class MockPrivacyPolicyPresenter extends Mock
    implements PrivacyPolicyPresenter {}

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late MockPrivacyPolicyPresenter presenter;
  late MockNavigationDriver navigationDriver;

  setUp(() {
    presenter = MockPrivacyPolicyPresenter();
    navigationDriver = MockNavigationDriver();

    when(() => navigationDriver.canGoBack()).thenReturn(true);
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          privacyPolicyPresenterProvider.overrideWithValue(presenter),
          navigationDriverProvider.overrideWithValue(navigationDriver),
        ],
        child: const PrivacyPolicyScreenView(),
      ),
    );
  }

  group('PrivacyPolicyScreenView', () {
    testWidgets('should render policy sections', (tester) async {
      final sections = [
        (title: 'Section 1', content: 'Content 1'),
        (title: 'Section 2', content: 'Content 2'),
      ];
      when(() => presenter.sections).thenReturn(signal(sections));

      await tester.pumpWidget(createWidget());

      expect(find.text('Section 1'), findsOneWidget);
      expect(find.text('Content 1'), findsOneWidget);
      expect(find.text('Section 2'), findsOneWidget);
      expect(find.text('Content 2'), findsOneWidget);
    });
  });
}
