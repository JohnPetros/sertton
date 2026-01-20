import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import '../../../../../../fakers/product_faker.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/global/responses/pagination_response.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart';

class MockCatalogService extends Mock implements CatalogService {}

void main() {
  late MockCatalogService catalogService;

  setUp(() {
    catalogService = MockCatalogService();
  });

  group('ProductsListPresenter', () {
    test('should load products on initialization', () async {
      final products = ProductFaker.fakeManyDto(count: 10);
      final pagination = PaginationResponse(
        items: products,
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 20,
      );

      when(
        () => catalogService.fetchProducts(page: any(named: 'page')),
      ).thenAnswer((_) async => RestResponse(body: pagination));

      final presenter = ProductsListPresenter(catalogService);

      expect(presenter.isLoading.value, isTrue);
      expect(presenter.products.value, isEmpty);

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.products.value, products);
      expect(presenter.hasMore.value, isTrue);
      expect(presenter.error.value, isNull);
    });

    test('should handle error when loading products', () async {
      when(
        () => catalogService.fetchProducts(page: any(named: 'page')),
      ).thenAnswer(
        (_) async => RestResponse(
          statusCode: 400,
          errorMessage: 'Error loading products',
        ),
      );

      final presenter = ProductsListPresenter(catalogService);

      await Future.delayed(Duration.zero);

      expect(presenter.isLoading.value, isFalse);
      expect(presenter.products.value, isEmpty);
      expect(presenter.error.value, 'Error loading products');
    });

    test('should load more products successfully', () async {
      final initialProducts = ProductFaker.fakeManyDto(count: 10);
      final initialPagination = PaginationResponse(
        items: initialProducts,
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 30,
      );

      when(
        () => catalogService.fetchProducts(page: 1),
      ).thenAnswer((_) async => RestResponse(body: initialPagination));

      final presenter = ProductsListPresenter(catalogService);
      await Future.delayed(Duration.zero);

      final moreProducts = ProductFaker.fakeManyDto(count: 10);
      final morePagination = PaginationResponse(
        items: moreProducts,
        itemsPerPage: 10,
        currentPage: 2,
        totalItems: 30,
      );

      when(
        () => catalogService.fetchProducts(page: 2),
      ).thenAnswer((_) async => RestResponse(body: morePagination));

      await presenter.loadMoreProducts();

      expect(presenter.products.value.length, 20);
      expect(presenter.hasMore.value, isTrue);
      expect(presenter.isLoading.value, isFalse);
    });

    test('should not load more products if currently loading', () async {
      final products = ProductFaker.fakeManyDto(count: 10);
      final pagination = PaginationResponse(
        items: products,
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 20,
      );

      when(
        () => catalogService.fetchProducts(page: 1),
      ).thenAnswer((_) async => RestResponse(body: pagination));

      final presenter = ProductsListPresenter(catalogService);
      presenter.isLoading.value = true;

      await presenter.loadMoreProducts();

      verify(() => catalogService.fetchProducts(page: 1)).called(1);
      verifyNever(() => catalogService.fetchProducts(page: 2));
    });

    test('should not load more products if hasMore is false', () async {
      final products = ProductFaker.fakeManyDto(count: 10);
      final pagination = PaginationResponse(
        items: products,
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 10,
      );

      when(
        () => catalogService.fetchProducts(page: 1),
      ).thenAnswer((_) async => RestResponse(body: pagination));

      final presenter = ProductsListPresenter(catalogService);
      await Future.delayed(Duration.zero);

      await presenter.loadMoreProducts();

      expect(presenter.hasMore.value, isFalse);
      verify(() => catalogService.fetchProducts(page: 1)).called(1);
      verifyNever(() => catalogService.fetchProducts(page: 2));
    });

    test('refresh should reset and reload products', () async {
      final initialProducts = ProductFaker.fakeManyDto(count: 10);
      final initialPagination = PaginationResponse(
        items: initialProducts,
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 20,
      );

      when(
        () => catalogService.fetchProducts(page: 1),
      ).thenAnswer((_) async => RestResponse(body: initialPagination));

      final presenter = ProductsListPresenter(catalogService);
      await Future.delayed(Duration.zero);

      final refreshedProducts = ProductFaker.fakeManyDto(count: 5);
      final refreshedPagination = PaginationResponse(
        items: refreshedProducts,
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 5,
      );

      when(
        () => catalogService.fetchProducts(page: 1),
      ).thenAnswer((_) async => RestResponse(body: refreshedPagination));

      await presenter.refresh();

      expect(presenter.products.value, refreshedProducts);
      expect(presenter.hasMore.value, isFalse);
      verify(() => catalogService.fetchProducts(page: 1)).called(2);
    });
  });
}
