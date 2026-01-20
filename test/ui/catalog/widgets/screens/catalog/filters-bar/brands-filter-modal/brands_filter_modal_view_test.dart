import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/core/catalog/dtos/fakers/brand_faker.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/brands-filter-modal/brands_filter_modal_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

void main() {
  group('BrandsFilterModalView', () {
    late List<BrandDto> brands;
    late List<BrandDto> selectedBrands;

    setUp(() {
      brands = BrandFaker.fakeManyDto(count: 5);
      selectedBrands = [brands[0], brands[1]];
    });

    Widget createWidget() {
      return ProviderScope(
        child: ShadcnApp(
          home: BrandsFilterModalView(
            brands: brands,
            selectedBrands: selectedBrands,
            onConfirm: (_) {},
          ),
        ),
      );
    }

    testWidgets('should display title', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Filtrar por Marcas'), findsOneWidget);
    });

    testWidgets('should display all brands', (tester) async {
      await tester.pumpWidget(createWidget());

      for (final brand in brands) {
        expect(find.text(brand.name), findsOneWidget);
      }
    });

    testWidgets('should show clear button when brands are selected', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Limpar'), findsOneWidget);
    });

    testWidgets('should not show clear button when no brands are selected', (
      tester,
    ) async {
      selectedBrands = [];
      await tester.pumpWidget(createWidget());

      expect(find.text('Limpar'), findsNothing);
    });

    testWidgets('should show cancel and confirm buttons', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Cancelar'), findsOneWidget);
      expect(find.text('Confirmar (2)'), findsOneWidget);
    });

    testWidgets('should show confirm count in button text', (tester) async {
      selectedBrands = [brands[0]];
      await tester.pumpWidget(createWidget());

      expect(find.text('Confirmar (1)'), findsOneWidget);
    });

    testWidgets('should show "Confirmar" when no brands selected', (
      tester,
    ) async {
      selectedBrands = [];
      await tester.pumpWidget(createWidget());

      expect(find.text('Confirmar'), findsOneWidget);
    });
  });
}
