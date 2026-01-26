import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals.dart';

import 'package:sertton/ui/global/widgets/screens/home/footer-section/home_footer_view.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/company-info-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/payment_methods_section_presenter.dart';

class MockPaymentMethodsSectionPresenter extends Mock
    implements PaymentMethodsSectionPresenter {}

void main() {
  late MockPaymentMethodsSectionPresenter presenter;

  setUp(() {
    presenter = MockPaymentMethodsSectionPresenter();
    when(() => presenter.isLoading).thenReturn(signal(false));
    when(() => presenter.paymentMethods).thenReturn(signal([]));
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          paymentMethodsSectionPresenterProvider.overrideWithValue(presenter),
        ],
        child: const Scaffold(
          child: SingleChildScrollView(child: HomeFooterView()),
        ),
      ),
    );
  }

  group('HomeFooterView', () {
    testWidgets('should render all sections', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.byType(PaymentMethodsSection), findsOneWidget);
      expect(find.byType(CompanyInfoSection), findsOneWidget);
      expect(find.byType(Divider), findsOneWidget);
    });
  });
}
