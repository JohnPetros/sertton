import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/checkout/stores/cart_store.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/ui/checkout/widgets/components/cart-dialog/cart_dialog_presenter.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import '../../../../../fakers/product_faker.dart';
import '../../../../../fakers/sku_faker.dart';
import '../../../../../fakers/variation_faker.dart';

class MockCartStore extends Mock implements CartStore {}

class MockNavigationDriver extends Mock implements NavigationDriver {}

void main() {
  late CartDialogPresenter presenter;
  late MockCartStore cartStore;
  late MockNavigationDriver navigationDriver;

  setUpAll(() {
    registerFallbackValue(CartItemDto(productId: '', skuId: '', quantity: 0));
  });

  setUp(() {
    cartStore = MockCartStore();
    navigationDriver = MockNavigationDriver();
  });

  group('CartDialogPresenter', () {
    test('should initialize with first SKU selected and quantity 1', () {
      final skus = SkuFaker.fakeManyDto(count: 2);
      final product = ProductFaker.fakeDto(skus: skus);

      presenter = CartDialogPresenter(
        product: product,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );

      expect(presenter.selectedSku.value, skus.first);
      expect(presenter.quantity.value, 1);
    });

    test('selectSku should update selectedSku and reset quantity', () {
      final variations = [
        VariationFaker.fakeDto(name: 'MATERIAL', value: 'Wood'),
        VariationFaker.fakeDto(name: 'MATERIAL', value: 'Iron'),
      ];
      final skus = [
        SkuFaker.fakeDto(
          id: '1',
          imageUrl: '',
          variations: [variations[0]],
          stock: 10,
        ),
        SkuFaker.fakeDto(
          id: '2',
          imageUrl: '',
          variations: [variations[1]],
          stock: 5,
        ),
      ];
      final product = ProductFaker.fakeDto(skus: skus);

      presenter = CartDialogPresenter(
        product: product,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );

      presenter.setQuantity(5);
      expect(presenter.quantity.value, 5);

      presenter.selectSku('Iron');
      expect(presenter.selectedSku.value, skus[1]);
      expect(presenter.quantity.value, 1);
    });

    test('variationOptions should contain unique variation values', () {
      final variations = [
        VariationFaker.fakeDto(name: 'MATERIAL', value: 'Wood'),
        VariationFaker.fakeDto(name: 'MATERIAL', value: 'Iron'),
      ];
      final skus = [
        SkuFaker.fakeDto(
          id: '1',
          imageUrl: '',
          variations: [variations[0]],
          stock: 10,
        ),
        SkuFaker.fakeDto(
          id: '2',
          imageUrl: '',
          variations: [variations[1]],
          stock: 5,
        ),
      ];
      final product = ProductFaker.fakeDto(skus: skus);

      presenter = CartDialogPresenter(
        product: product,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );

      expect(presenter.variationOptions, containsAll(['Wood', 'Iron']));
    });

    test('isOutOfStock should be true when stock is 0', () {
      final sku = SkuFaker.fakeDto(
        id: '1',
        imageUrl: '',
        variations: [],
        stock: 0,
      );
      final product = ProductFaker.fakeDto(skus: [sku]);

      presenter = CartDialogPresenter(
        product: product,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );

      expect(presenter.isOutOfStock.value, isTrue);
      expect(presenter.canAdd.value, isFalse);
    });

    test('addToCart should add item to cartStore and go back', () async {
      final skus = SkuFaker.fakeManyDto(count: 1);
      final product = ProductFaker.fakeDto(
        slug: 'test-product',
        name: 'Test Product',
        skus: skus,
        imageUrl: 'prod-img',
      );

      presenter = CartDialogPresenter(
        product: product,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );

      presenter.setQuantity(2);

      when(() => cartStore.addItem(any())).thenReturn(null);
      when(() => navigationDriver.back()).thenReturn(null);

      await presenter.addToCart();

      verify(
        () => cartStore.addItem(
          any(
            that: isA<CartItemDto>()
                .having((i) => i.productId, 'productId', product.id)
                .having((i) => i.quantity, 'quantity', 2)
                .having((i) => i.skuId, 'skuId', skus.first.id),
          ),
        ),
      ).called(1);

      verify(() => navigationDriver.back()).called(1);
      verify(() => navigationDriver.go(Routes.cart)).called(1);
      expect(presenter.isSubmitting.value, isFalse);
    });
  });
}
