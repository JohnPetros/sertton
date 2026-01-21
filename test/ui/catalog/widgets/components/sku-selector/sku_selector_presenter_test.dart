import 'package:flutter_test/flutter_test.dart';
import '../../../../../fakers/sku_faker.dart';
import '../../../../../fakers/variation_faker.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/sku_selector_presenter.dart';

void main() {
  group('SkuSelectorPresenter', () {
    const variationLabel = 'Cor';

    final sku1 = SkuFaker.fakeDto(
      props: (
        id: null,
        skuCode: 'SKU1',
        costPrice: null,
        salePrice: null,
        discountPrice: null,
        weight: null,
        height: null,
        width: null,
        length: null,
        imageUrl: null,
        variations: [
          VariationFaker.fakeDto(props: (id: null, name: 'Cor', value: 'Azul')),
        ],
        stock: 5,
        yampiToken: null,
      ),
    );

    final sku2 = SkuFaker.fakeDto(
      props: (
        id: null,
        skuCode: 'SKU2',
        costPrice: null,
        salePrice: null,
        discountPrice: null,
        weight: null,
        height: null,
        width: null,
        length: null,
        imageUrl: null,
        variations: [
          VariationFaker.fakeDto(
            props: (id: null, name: 'Cor', value: 'Vermelho'),
          ),
        ],
        stock: 10,
        yampiToken: null,
      ),
    );

    final skus = [sku1, sku2];

    test('should initialize with first SKU as default if none provided', () {
      final presenter = SkuSelectorPresenter(
        skus: skus,
        variationLabel: variationLabel,
        onSkuSelected: (_) {},
        onQuantityChanged: (_) {},
      );

      expect(presenter.selectedSku.value, sku1);
      expect(presenter.maxQuantity.value, 5);
      expect(
        presenter.variationOptions.value,
        containsAll(['Azul', 'Vermelho']),
      );
    });

    test('should select SKU by variation value', () {
      SkuDto? selectedSku;
      final presenter = SkuSelectorPresenter(
        skus: skus,
        variationLabel: variationLabel,
        onSkuSelected: (sku) => selectedSku = sku,
        onQuantityChanged: (_) {},
      );

      presenter.selectSkuByVariation('Vermelho');
      expect(presenter.selectedSku.value, sku2);
      expect(selectedSku, sku2);
      expect(presenter.quantity.value, 1);
    });
  });
}
