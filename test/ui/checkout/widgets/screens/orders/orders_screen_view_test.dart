import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders_screen_presenter.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders_screen_view.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/empty-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/error-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/identification-form/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/loading-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders-header/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders-list/index.dart';

import '../../../../../fakers/checkout/order_faker.dart';

class MockOrdersScreenPresenter extends Mock implements OrdersScreenPresenter {}

void main() {
  late MockOrdersScreenPresenter presenter;

  setUp(() {
    presenter = MockOrdersScreenPresenter();

    // Default Stubs
    when(() => presenter.document).thenReturn(signal(''));
    when(() => presenter.documentType).thenReturn(signal(DocumentType.cpf));
    when(() => presenter.isIdentified).thenReturn(signal(false));
    when(() => presenter.orders).thenReturn(signal([]));
    when(() => presenter.isLoading).thenReturn(signal(false));
    when(() => presenter.hasError).thenReturn(signal(false));
    when(() => presenter.errorMessage).thenReturn(signal(''));
    when(() => presenter.isDocumentValid).thenReturn(computed(() => false));
    when(() => presenter.formattedDocument).thenReturn(computed(() => ''));
    when(() => presenter.sortedOrders).thenReturn(computed(() => []));

    // Void methods
    when(() => presenter.init()).thenReturn(null);
    when(() => presenter.setDocument(any())).thenReturn(null);
    when(() => presenter.setDocumentType(any())).thenReturn(null);
    when(() => presenter.fetchOrders()).thenAnswer((_) async {});
    when(() => presenter.logout()).thenReturn(null);
  });

  setUpAll(() {
    registerFallbackValue(DocumentType.cpf);
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [ordersScreenPresenterProvider.overrideWithValue(presenter)],
        child: const OrdersScreenView(),
      ),
    );
  }

  group('OrdersScreenView', () {
    testWidgets('should call init on startup', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
      });
      verify(() => presenter.init()).called(1);
    });

    testWidgets('should show IdentificationForm when not identified', (
      tester,
    ) async {
      when(() => presenter.isIdentified).thenReturn(signal(false));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
      });

      expect(find.byType(IdentificationForm), findsOneWidget);
      expect(find.byType(OrdersList), findsNothing);
    });

    testWidgets('should show LoadingState when loading and orders empty', (
      tester,
    ) async {
      when(() => presenter.isIdentified).thenReturn(signal(true));
      when(() => presenter.isLoading).thenReturn(signal(true));
      when(() => presenter.orders).thenReturn(signal([]));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
      });

      expect(find.byType(OrdersLoadingState), findsOneWidget);
    });

    testWidgets('should show ErrorState when has error and orders empty', (
      tester,
    ) async {
      when(() => presenter.isIdentified).thenReturn(signal(true));
      when(() => presenter.hasError).thenReturn(signal(true));
      when(() => presenter.errorMessage).thenReturn(signal('Error msg'));
      when(() => presenter.orders).thenReturn(signal([]));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
      });

      expect(find.byType(OrdersErrorState), findsOneWidget);
      expect(find.text('Error msg'), findsOneWidget);
    });

    testWidgets('should show EmptyState when no orders found', (tester) async {
      when(() => presenter.isIdentified).thenReturn(signal(true));
      when(() => presenter.orders).thenReturn(signal([]));
      when(() => presenter.isLoading).thenReturn(signal(false));
      when(() => presenter.hasError).thenReturn(signal(false));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
      });

      expect(find.byType(OrdersEmptyState), findsOneWidget);
    });

    testWidgets('should show OrdersList and OrdersHeader when orders exist', (
      tester,
    ) async {
      final orders = OrderFaker.fakeManyDto();

      when(() => presenter.isIdentified).thenReturn(signal(true));
      when(() => presenter.orders).thenReturn(signal(orders));
      when(() => presenter.sortedOrders).thenReturn(computed(() => orders));
      when(
        () => presenter.formattedDocument,
      ).thenReturn(computed(() => '111.111.111-11'));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
      });

      expect(find.byType(OrdersList), findsOneWidget);
      expect(find.byType(OrdersHeader), findsOneWidget);
      expect(find.text('111.111.111-11'), findsOneWidget);
    });

    testWidgets(
      'should call logout when tapping Alterar documento in EmptyState',
      (tester) async {
        when(() => presenter.isIdentified).thenReturn(signal(true));
        when(() => presenter.orders).thenReturn(signal(<OrderDto>[]));
        when(() => presenter.isLoading).thenReturn(signal(false));
        when(() => presenter.hasError).thenReturn(signal(false));

        await mockNetworkImagesFor(() async {
          await tester.pumpWidget(createWidget());
        });
        await tester.pumpAndSettle();

        expect(find.byType(OrdersEmptyState), findsOneWidget);
        expect(find.text('Alterar documento'), findsOneWidget);

        await tester.tap(find.text('Alterar documento'));
        verify(() => presenter.logout()).called(1);
      },
    );

    testWidgets('should call fetchOrders when refreshing list', (tester) async {
      final orders = OrderFaker.fakeManyDto();
      when(() => presenter.isIdentified).thenReturn(signal(true));
      when(() => presenter.orders).thenReturn(signal(orders));
      when(() => presenter.sortedOrders).thenReturn(computed(() => orders));
      when(
        () => presenter.formattedDocument,
      ).thenReturn(computed(() => '111.111.111-11'));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
      });
      await tester.pumpAndSettle();

      await tester.fling(find.byType(OrdersHeader), const Offset(0, 300), 1000);
      await tester.pumpAndSettle();
      verify(() => presenter.fetchOrders()).called(1);
    });
  });
}
