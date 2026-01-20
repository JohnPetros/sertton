import 'package:flutter/material.dart' hide Card, Theme;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-skeleton/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product_list_view.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import '../../../../../../fakers/product_faker.dart';

class MockProductsListPresenter extends Mock implements ProductsListPresenter {}

void main() {
  late MockProductsListPresenter presenter;

  setUp(() {
    presenter = MockProductsListPresenter();

    when(() => presenter.products).thenReturn(signal<List<ProductDto>>([]));
    when(() => presenter.isLoading).thenReturn(signal(false));
    when(() => presenter.hasMore).thenReturn(signal(false));
    when(() => presenter.error).thenReturn(signal(null));
    when(() => presenter.refresh()).thenAnswer((_) async {});
    when(() => presenter.loadMoreProducts()).thenAnswer((_) async {});
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [presenterProvider.overrideWithValue(presenter)],
        child: const ProductListView(),
      ),
    );
  }

  testWidgets('should show skeletons when initial loading', (tester) async {
    when(() => presenter.isLoading).thenReturn(signal(true));

    await mockNetworkImagesFor(() async {
      await tester.pumpWidget(createWidget());
    });

    expect(find.byType(ProductCardSkeleton), findsWidgets);
    expect(find.byType(ProductCard), findsNothing);
  });

  testWidgets(
    'should show error message when there is an error and no products',
    (tester) async {
      when(() => presenter.error).thenReturn(signal('Erro ao carregar'));
      when(() => presenter.products).thenReturn(signal([]));
      when(() => presenter.isLoading).thenReturn(signal(false));

      await tester.pumpWidget(createWidget());
      await tester.pump();

      expect(find.text('Erro ao carregar'), findsOneWidget);
      expect(find.text('Tentar novamente'), findsOneWidget);
    },
  );

  testWidgets('should call refresh when try again button is clicked', (
    tester,
  ) async {
    when(() => presenter.error).thenReturn(signal('Erro ao carregar'));
    when(() => presenter.products).thenReturn(signal([]));

    await tester.pumpWidget(createWidget());
    await tester.pump();

    await tester.tap(find.text('Tentar novamente'));

    verify(() => presenter.refresh()).called(1);
  });

  testWidgets('should show list of products when loaded', (tester) async {
    final products = ProductFaker.fakeManyDto(count: 3);
    when(() => presenter.products).thenReturn(signal(products));
    when(() => presenter.hasMore).thenReturn(signal(false));

    await mockNetworkImagesFor(() async {
      await tester.pumpWidget(createWidget());
      await tester.pump();
    });

    expect(find.byType(ProductCard), findsNWidgets(3));
    expect(find.byType(ProductCardSkeleton), findsNothing);
  });

  testWidgets(
    'should show loading skeleton at the bottom when hasMore is true',
    (tester) async {
      final products = ProductFaker.fakeManyDto(count: 3);
      when(() => presenter.products).thenReturn(signal(products));
      when(() => presenter.hasMore).thenReturn(signal(true));

      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());
        await tester.pump();
      });

      expect(find.byType(ProductCard), findsNWidgets(3));
      expect(find.byType(ProductCardSkeleton), findsOneWidget);
    },
  );

  testWidgets('should call loadMoreProducts when scrolling to bottom', (
    tester,
  ) async {
    final products = ProductFaker.fakeManyDto(count: 10);
    when(() => presenter.products).thenReturn(signal(products));
    when(() => presenter.hasMore).thenReturn(signal(true));

    await mockNetworkImagesFor(() async {
      await tester.pumpWidget(createWidget());
      await tester.pump();
    });

    await tester.drag(find.byType(ListView), const Offset(0, -5000));
    await tester.pump();

    verify(() => presenter.loadMoreProducts()).called(1);
  });

  testWidgets('should call refresh when pull to refresh', (tester) async {
    final products = ProductFaker.fakeManyDto(count: 3);
    when(() => presenter.products).thenReturn(signal(products));
    when(() => presenter.hasMore).thenReturn(signal(false));

    await mockNetworkImagesFor(() async {
      await tester.pumpWidget(createWidget());
      await tester.pump();
    });

    expect(find.byType(RefreshIndicator), findsOneWidget);

    await tester.fling(find.byType(ListView), const Offset(0, 300), 1000);
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));

    verify(() => presenter.refresh()).called(1);
  });
}
