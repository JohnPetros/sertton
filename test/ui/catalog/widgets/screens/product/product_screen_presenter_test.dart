import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/ui/checkout/stores/cart_store.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import '../../../../../fakers/product_faker.dart';
import '../../../../../fakers/sku_faker.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product_screen_presenter.dart';
import 'package:sertton/constants/routes.dart';

class MockCatalogService extends Mock implements CatalogService {}

class MockCartStore extends Mock implements CartStore {}

class MockNavigationDriver extends Mock implements NavigationDriver {}

class CartItemDtoFake extends Fake implements CartItemDto {}

void main() {
  setUpAll(() {
    registerFallbackValue(CartItemDtoFake());
  });

  late ProductScreenPresenter presenter;
  late MockCatalogService catalogService;
  late MockCartStore cartStore;
  late MockNavigationDriver navigationDriver;
  const productId = '123';

  setUp(() {
    catalogService = MockCatalogService();
    cartStore = MockCartStore();
    navigationDriver = MockNavigationDriver();
  });

  group('ProductScreenPresenter', () {
    test('should load product on initialization', () async {
      final product = ProductFaker.fakeDto(
        id: productId,
        name: 'Test Product',
        skus: [SkuFaker.fakeDto()],
      );

      when(
        () => catalogService.fetchProduct(productId),
      ).thenAnswer((_) async => RestResponse(body: product));

      presenter = ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );

      expect(presenter.isLoading.value, isTrue);

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.product.value, product);
      expect(presenter.selectedSku.value, product.skus.first);
      expect(presenter.hasError.value, isFalse);
    });

    test('should set hasError when fetch fails', () async {
      when(() => catalogService.fetchProduct(productId)).thenAnswer(
        (_) async => RestResponse(statusCode: 500, errorMessage: 'Error'),
      );

      presenter = ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.hasError.value, isTrue);
      expect(presenter.product.value, isNull);
    });

    test('selectSku should update selectedSku and reset quantity', () async {
      final skus = SkuFaker.fakeManyDto(count: 2);
      final product = ProductFaker.fakeDto(id: productId, skus: skus);

      when(
        () => catalogService.fetchProduct(productId),
      ).thenAnswer((_) async => RestResponse(body: product));

      presenter = ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );
      await Future.delayed(Duration.zero);

      presenter.updateQuantity(5);
      expect(presenter.quantity.value, 5);

      presenter.selectSku(skus[1]);
      expect(presenter.selectedSku.value, skus[1]);
      expect(presenter.quantity.value, 1);
    });

    test('handleAddToCart should add item and navigate to cart', () async {
      final sku = SkuFaker.fakeDto();
      final product = ProductFaker.fakeDto(id: productId, skus: [sku]);

      when(
        () => catalogService.fetchProduct(productId),
      ).thenAnswer((_) async => RestResponse(body: product));

      presenter = ProductScreenPresenter(
        productId: productId,
        catalogService: catalogService,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );
      await Future.delayed(Duration.zero);

      presenter.handleAddToCart();

      verify(() => cartStore.addItem(any())).called(1);

      await Future.delayed(const Duration(milliseconds: 600));

      verify(() => navigationDriver.go(Routes.cart)).called(1);
      expect(presenter.isAddingToCart.value, isFalse);
    });
  });
}
