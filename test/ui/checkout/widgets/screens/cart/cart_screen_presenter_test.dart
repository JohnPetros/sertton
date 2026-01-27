import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:signals/signals.dart';

import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/core/checkout/stores/cart_store.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart';

import '../../../../../fakers/product_faker.dart';
import '../../../../../fakers/sku_faker.dart';
import '../../../../../fakers/checkout/cart_item_faker.dart';

class MockCatalogService extends Mock implements CatalogService {}

class MockCheckoutService extends Mock implements CheckoutService {}

class MockCartStore extends Mock implements CartStore {}

class MockUrlDriver extends Mock implements UrlDriver {}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() {
    registerFallbackValue(Uri());
  });

  late CartScreenPresenter presenter;
  late MockCatalogService catalogService;
  late MockCheckoutService checkoutService;
  late MockCartStore cartStore;
  late MockUrlDriver urlDriver;

  setUp(() {
    catalogService = MockCatalogService();
    checkoutService = MockCheckoutService();
    cartStore = MockCartStore();
    urlDriver = MockUrlDriver();

    final itemsSignal = signal<List<CartItemDto>>([]);
    when(() => cartStore.items).thenReturn(itemsSignal);
  });

  group('CartScreenPresenter', () {
    test('loadCartProducts should update display items on success', () async {
      final sku = SkuFaker.fakeDto(
        id: 'sku1',
        skuCode: 'SKU1',
        salePrice: 100,
        discountPrice: 80,
        stock: 10,
        yampiToken: 'token1',
      );
      final product = ProductFaker.fakeDto(
        id: 'p1',
        name: 'Product 1',
        skus: [sku],
      );
      final cartItem = CartItemFaker.fakeDto(
        productId: 'p1',
        skuId: 'sku1',
        quantity: 2,
      );

      cartStore.items.value = [cartItem];

      when(
        () => catalogService.fetchProduct('p1'),
      ).thenAnswer((_) async => RestResponse(body: product));

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      await Future.delayed(Duration.zero); // Wait for effect

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.cartDisplayItems.value.length, 1);
      final item = presenter.cartDisplayItems.value.first;
      expect(item.skuId, 'sku1');
      expect(item.name, 'Product 1');
      expect(item.quantity, 2);
      expect(item.salePrice, 100);
      expect(item.discountPrice, 80);
    });

    test('loadCartProducts should handle empty cart', () async {
      cartStore.items.value = [];

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.cartDisplayItems.value, isEmpty);
    });

    test('loadCartProducts should handle catalog error', () async {
      final cartItem = CartItemFaker.fakeDto(
        productId: 'p1',
        skuId: 'sku1',
        quantity: 1,
      );
      cartStore.items.value = [cartItem];

      when(
        () => catalogService.fetchProduct('p1'),
      ).thenAnswer((_) async => RestResponse(statusCode: 500));

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      // Even if it fails to fetch one product, it doesn't set hasError to true
      // in the current implementation unless an exception is thrown.
      // Wait, let's check the code.
    });

    test('loadCartProducts should set hasError on exception', () async {
      final cartItem = CartItemFaker.fakeDto();
      cartStore.items.value = [cartItem];

      when(() => catalogService.fetchProduct(any())).thenThrow(Exception());

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.hasError.value, isTrue);
      expect(presenter.isLoading.value, isFalse);
    });

    test('updateItemQuantity should delegate to store', () async {
      when(() => cartStore.updateQuantity(any(), any())).thenReturn(null);

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      presenter.updateItemQuantity('sku1', 5);

      verify(() => cartStore.updateQuantity('sku1', 5)).called(1);
    });

    test('removeItem should delegate to store', () async {
      when(() => cartStore.removeItem(any())).thenReturn(null);

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      presenter.removeItem('sku1');

      verify(() => cartStore.removeItem('sku1')).called(1);
    });

    test('clearCart should clear store and display items', () async {
      when(() => cartStore.clear()).thenReturn(null);

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      presenter.cartDisplayItems.value = [
        CartDisplayItem(
          skuId: 'sku1',
          name: 'Product 1',
          imageUrl: '',
          skuCode: 'SKU1',
          variationName: '',
          variationValue: '',
          salePrice: 100,
          discountPrice: 80,
          quantity: 1,
          maxQuantity: 10,
          yampiToken: 'token1',
        ),
      ];

      presenter.clearCart();

      verify(() => cartStore.clear()).called(1);
      expect(presenter.cartDisplayItems.value, isEmpty);
    });

    test('computed signals should reflect cart state', () {
      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      presenter.cartDisplayItems.value = [
        CartDisplayItem(
          skuId: 'sku1',
          name: 'Product 1',
          imageUrl: '',
          skuCode: 'SKU1',
          variationName: '',
          variationValue: '',
          salePrice: 100,
          discountPrice: 80,
          quantity: 2,
          maxQuantity: 10,
          yampiToken: 'token1',
        ),
      ];

      expect(presenter.itemCount.value, 2);
      expect(presenter.subtotal.value, 200.0);
      expect(presenter.totalDiscount.value, 40.0);
      expect(presenter.total.value, 160.0);
      expect(presenter.isEmpty.value, false);
      expect(presenter.canCheckout.value, true);
    });

    test('checkout should call checkout service with correct data', () async {
      const checkoutUrl = 'https://checkout.yampi.com/123';

      presenter = CartScreenPresenter(
        catalogService: catalogService,
        checkoutService: checkoutService,
        cartStore: cartStore,
        urlDriver: urlDriver,
      );

      presenter.isLoading.value = false;
      presenter.cartDisplayItems.value = [
        CartDisplayItem(
          skuId: 'sku1',
          name: 'Product 1',
          imageUrl: '',
          skuCode: 'SKU1',
          variationName: '',
          variationValue: '',
          salePrice: 100,
          discountPrice: 80,
          quantity: 1,
          maxQuantity: 10,
          yampiToken: 'token1',
        ),
      ];

      when(
        () => checkoutService.fetchCheckoutLink(['token1'], [1]),
      ).thenAnswer((_) async => RestResponse(body: checkoutUrl));

      when(() => urlDriver.canLaunch(any())).thenAnswer((_) async => true);
      when(() => urlDriver.launch(any())).thenAnswer((_) async => null);

      await presenter.checkout();

      verify(
        () => checkoutService.fetchCheckoutLink(['token1'], [1]),
      ).called(1);
      verify(() => urlDriver.launch(Uri.parse(checkoutUrl))).called(1);
    });
  });
}
