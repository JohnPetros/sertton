import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals.dart';

import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/payment_methods_section_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/payment_methods_section_view.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/payment-methods-section/widgets/payment_methods_skeleton.dart';

import '../../../../../../../fakers/checkout/payment_faker.dart';

class MockPaymentMethodsSectionPresenter extends Mock
    implements PaymentMethodsSectionPresenter {}

void main() {
  late MockPaymentMethodsSectionPresenter presenter;

  setUp(() {
    presenter = MockPaymentMethodsSectionPresenter();
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          paymentMethodsSectionPresenterProvider.overrideWithValue(presenter),
        ],
        child: const Scaffold(child: PaymentMethodsSectionView()),
      ),
    );
  }

  group('PaymentMethodsSectionView', () {
    testWidgets('should render skeleton when loading', (tester) async {
      when(() => presenter.isLoading).thenReturn(signal(true));
      when(() => presenter.paymentMethods).thenReturn(signal([]));

      await tester.pumpWidget(createWidget());

      expect(find.byType(PaymentMethodsSkeleton), findsOneWidget);
    });

    testWidgets('should render message when empty', (tester) async {
      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.paymentMethods).thenReturn(signal([]));

      await tester.pumpWidget(createWidget());

      expect(
        find.text('Nenhuma forma de pagamento disponível'),
        findsOneWidget,
      );
    });

    // TODO: Fix SvgPicture.network mocking with network_image_mock compatibility
    testWidgets('should render payment methods', (tester) async {
      final payment = PaymentFaker.fakeDto(
        method: PaymentMethod.creditCard,
        icon: 'https://example.com/icon.svg',
      );
      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.paymentMethods).thenReturn(signal([payment]));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
        await tester.pump();
      });

      expect(find.text('FORMAS DE PAGAMENTO'), findsOneWidget);
      expect(find.byType(SvgPicture), findsOneWidget);
    }, skip: true);
  });
}
