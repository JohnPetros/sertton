import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/institutional/widgets/screens/return_policy/return_policy_presenter.dart';
import 'package:sertton/ui/institutional/widgets/screens/return_policy/return_policy_view.dart';

class MockReturnPolicyPresenter extends Mock implements ReturnPolicyPresenter {}

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late MockReturnPolicyPresenter presenter;
  late MockNavigationDriver navigationDriver;

  setUp(() {
    presenter = MockReturnPolicyPresenter();
    navigationDriver = MockNavigationDriver();

    when(() => navigationDriver.canGoBack()).thenReturn(true);
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          returnPolicyPresenterProvider.overrideWithValue(presenter),
          navigationDriverProvider.overrideWithValue(navigationDriver),
        ],
        child: const ReturnPolicyScreenView(),
      ),
    );
  }

  group('ReturnPolicyScreenView', () {
    testWidgets('should render policy sections', (tester) async {
      final sections = [(title: 'Return Policy 1', content: 'Content 1')];
      when(() => presenter.sections).thenReturn(signal(sections));

      await tester.pumpWidget(createWidget());

      expect(find.text('Return Policy 1'), findsOneWidget);
      expect(find.text('Content 1'), findsOneWidget);
    });
  });
}
