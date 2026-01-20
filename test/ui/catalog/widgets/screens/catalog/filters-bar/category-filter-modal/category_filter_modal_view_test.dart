import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/category-filter-modal/category_filter_modal_view.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

import '../../../../../../../fakers/category_faker.dart';

void main() {
  group('CategoryFilterModalView', () {
    late List<CategoryDto> categories;
    CategoryDto? selectedCategory;

    setUp(() {
      categories = CategoryFaker.fakeManyDto(count: 5);
      selectedCategory = null;
    });

    Widget createWidget() {
      return ProviderScope(
        child: ShadcnApp(
          home: CategoryFilterModalView(
            categories: categories,
            selectedCategory: selectedCategory,
            onSelect: (_) {},
          ),
        ),
      );
    }

    testWidgets('should display title', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Categorias'), findsOneWidget);
    });

    testWidgets('should display all categories option', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Todas as categorias'), findsOneWidget);
    });

    testWidgets('should display all categories', (tester) async {
      await tester.pumpWidget(createWidget());

      for (final category in categories) {
        expect(find.text(category.name), findsOneWidget);
      }
    });

    testWidgets('should display cancel button', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.text('Cancelar'), findsOneWidget);
    });
  });
}
