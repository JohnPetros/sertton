import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-header/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-header/product_header_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MockProductHeaderPresenter extends Mock
    implements ProductHeaderPresenter {}

void main() {
  late MockProductHeaderPresenter presenter;
  const skuCode = 'SKU123';
  const title = 'Awesome Product';

  setUp(() {
    presenter = MockProductHeaderPresenter();
    when(
      () => presenter.formattedSkuCode,
    ).thenReturn(computed(() => 'SKU: $skuCode'));
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          productHeaderPresenterProvider.overrideWith(
            (ref, props) => presenter,
          ),
        ],
        child: const ProductHeader(skuCode: skuCode, title: title),
      ),
    );
  }

  group('ProductHeaderView', () {
    testWidgets('should render sku code and title correctly', (tester) async {
      await tester.pumpWidget(createWidget());
      await tester.pump();

      expect(find.text('SKU: $skuCode'), findsOneWidget);
      expect(find.text(title), findsOneWidget);
    });
  });
}
