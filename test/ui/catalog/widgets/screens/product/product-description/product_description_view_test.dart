import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import '../../../../../../fakers/product_faker.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-description/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-description/product_description_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MockProductDescriptionPresenter extends Mock
    implements ProductDescriptionPresenter {}

void main() {
  late MockProductDescriptionPresenter presenter;
  final product = ProductFaker.fakeDto();

  setUp(() {
    presenter = MockProductDescriptionPresenter();
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          productDescriptionPresenterProvider.overrideWith(
            (ref, p) => presenter,
          ),
        ],
        child: ProductDescriptionView(product: product),
      ),
    );
  }

  group('ProductDescriptionView', () {
    testWidgets('should render description and specifications sections', (
      tester,
    ) async {
      when(() => presenter.description).thenReturn(signal('Mock Description'));
      when(() => presenter.specifications).thenReturn(signal('Mock Specs'));

      await tester.pumpWidget(createWidget());
      await tester.pump();

      expect(find.text('Descrição do produto'), findsOneWidget);
      expect(find.text('Mock Description'), findsOneWidget);
      expect(find.text('Especificações técnicas'), findsOneWidget);
      expect(find.text('Mock Specs'), findsOneWidget);
    });

    testWidgets('should hide sections when content is empty', (tester) async {
      when(() => presenter.description).thenReturn(signal(''));
      when(() => presenter.specifications).thenReturn(signal(''));

      await tester.pumpWidget(createWidget());
      await tester.pump();

      expect(find.text('Descrição do produto'), findsNothing);
      expect(find.text('Especificações técnicas'), findsNothing);
    });
  });
}
