import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/ui/checkout/stores/cart_store.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/core/global/interfaces/cache_driver.dart';

import '../../../fakers/checkout/cart_item_faker.dart';

class MockCacheDriver extends Mock implements CacheDriver {}

void main() {
  late MockCacheDriver cacheDriver;
  late CartStore cartStore;

  const storageKey = 'sertton:checkout:cart_items';

  setUp(() {
    cacheDriver = MockCacheDriver();
    // Default: no items in cache
    when(() => cacheDriver.get(storageKey)).thenReturn(null);
    cartStore = CartStore(cacheDriver);
  });

  group('CartStore', () {
    group('initialization', () {
      test('should load items from cache when initialized', () {
        final items = CartItemFaker.fakeManyDto(count: 2);
        final jsonItems = jsonEncode(
          items
              .map(
                (e) => {
                  'productId': e.productId,
                  'skuId': e.skuId,
                  'quantity': e.quantity,
                },
              )
              .toList(),
        );

        when(() => cacheDriver.get(storageKey)).thenReturn(jsonItems);

        final store = CartStore(cacheDriver);

        expect(store.items.value.length, 2);
        expect(store.items.value[0].skuId, items[0].skuId);
      });

      test('should delete cache if decoding fails', () {
        when(() => cacheDriver.get(storageKey)).thenReturn('invalid json');

        CartStore(cacheDriver);

        verify(() => cacheDriver.delete(storageKey)).called(1);
      });
    });

    group('addItem', () {
      test('should add new item when it does not exist in cart', () {
        final item = CartItemFaker.fakeDto();

        cartStore.addItem(item);

        expect(cartStore.items.value, contains(item));
        verify(() => cacheDriver.set(storageKey, any())).called(1);
      });

      test('should update quantity of existing item (replace)', () {
        final item = CartItemFaker.fakeDto(
          productId: 'p1',
          skuId: 's1',
          quantity: 1,
        );
        cartStore.addItem(item);

        final newItem = CartItemDto(
          productId: item.productId,
          skuId: item.skuId,
          quantity: 5,
        );
        cartStore.addItem(newItem);

        expect(cartStore.items.value.length, 1);
        expect(cartStore.items.value.first.quantity, 5);
      });
    });

    group('removeItem', () {
      test('should remove item by skuId', () {
        final item = CartItemFaker.fakeDto();
        cartStore.addItem(item);

        cartStore.removeItem(item.skuId);

        expect(cartStore.items.value, isEmpty);
        verify(() => cacheDriver.set(storageKey, any())).called(2);
      });
    });

    group('updateQuantity', () {
      test('should update quantity of existing item', () {
        final item = CartItemFaker.fakeDto(
          productId: 'p1',
          skuId: 's1',
          quantity: 1,
        );
        cartStore.addItem(item);

        cartStore.updateQuantity('s1', 10);

        expect(cartStore.items.value.first.quantity, 10);
      });

      test('should remove item if quantity is zero or less', () {
        final item = CartItemFaker.fakeDto(
          productId: 'p1',
          skuId: 's1',
          quantity: 5,
        );
        cartStore.addItem(item);

        cartStore.updateQuantity('s1', 0);

        expect(cartStore.items.value, isEmpty);
      });
    });

    group('clear', () {
      test('should remove all items', () {
        cartStore.addItem(CartItemFaker.fakeDto());
        cartStore.addItem(CartItemFaker.fakeDto());

        cartStore.clear();

        expect(cartStore.items.value, isEmpty);
        verify(() => cacheDriver.set(storageKey, '[]')).called(1);
      });
    });

    group('computed properties', () {
      test('should have initial values as 0.0', () {
        expect(cartStore.subtotal.value, 0.0);
        expect(cartStore.totalDiscount.value, 0.0);
        expect(cartStore.total.value, 0.0);
      });
    });
  });
}
