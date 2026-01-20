import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/services.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/filters_bar_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class MockCatalogService extends Mock implements CatalogService {}

void main() {
  group('FiltersBarView', () {
    late MockCatalogService mockCatalogService;

    setUp(() {
      mockCatalogService = MockCatalogService();

      when(
        () => mockCatalogService.fetchCategories(),
      ).thenAnswer((_) async => RestResponse(body: []));
      when(
        () => mockCatalogService.fetchBrands(),
      ).thenAnswer((_) async => RestResponse(body: []));
    });

    Widget createWidget() {
      return ProviderScope(
        overrides: [
          catalogServiceProvider.overrideWithValue(mockCatalogService),
        ],
        child: ShadcnApp(
          home: FiltersBarView(
            onFilterChanged: ({categoryId, required brandsIds}) {},
          ),
        ),
      );
    }

    testWidgets('should display category filter button', (tester) async {
      await tester.pumpWidget(createWidget());
      await tester.pumpAndSettle();

      expect(find.text('Categoria'), findsOneWidget);
    });

    testWidgets('should display brands filter button', (tester) async {
      await tester.pumpWidget(createWidget());
      await tester.pumpAndSettle();

      expect(find.text('Marcas'), findsOneWidget);
    });
  });
}
