import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/core/global/interfaces/cache_driver.dart';

import 'package:sertton/drivers/cache-driver/index.dart';

class CartStore {
  static const String _storageKey = 'sertton:checkout:cart_items';
  final CacheDriver _cacheDriver;

  CartStore(this._cacheDriver) {
    _loadFromCache();
  }

  final items = signal<List<CartItemDto>>([]);

  late final subtotal = computed(() => 0.0);
  late final totalDiscount = computed(() => 0.0);
  late final total = computed(() => 0.0);

  void addItem(CartItemDto item) {
    final existingIndex = items.value.indexWhere((i) => i.skuId == item.skuId);

    if (existingIndex != -1) {
      final existing = items.value[existingIndex];
      items.value[existingIndex] = CartItemDto(
        productId: existing.productId,
        skuId: existing.skuId,
        quantity: item.quantity,
      );
      items.value = [...items.value]; // Notify watchers
    } else {
      items.value = [...items.value, item];
    }
    _saveToCache();
  }

  void removeItem(String skuId) {
    items.value = items.value.where((i) => i.skuId != skuId).toList();
    _saveToCache();
  }

  void updateQuantity(String skuId, int quantity) {
    if (quantity <= 0) {
      removeItem(skuId);
      return;
    }

    final index = items.value.indexWhere((i) => i.skuId == skuId);
    if (index != -1) {
      final existing = items.value[index];
      items.value[index] = CartItemDto(
        productId: existing.productId,
        skuId: existing.skuId,
        quantity: quantity,
      );
      items.value = [...items.value];
      _saveToCache();
    }
  }

  void clear() {
    items.value = [];
    _saveToCache();
  }

  void _saveToCache() {
    final jsonList = items.value
        .map(
          (i) => {
            'productId': i.productId,
            'skuId': i.skuId,
            'quantity': i.quantity,
          },
        )
        .toList();
    _cacheDriver.set(_storageKey, jsonEncode(jsonList));
  }

  void _loadFromCache() {
    final cachedData = _cacheDriver.get(_storageKey);
    if (cachedData != null) {
      try {
        final List<dynamic> jsonList = jsonDecode(cachedData);
        items.value = jsonList
            .map(
              (i) => CartItemDto(
                productId: i['productId'] ?? '',
                skuId: i['skuId'] ?? '',
                quantity: i['quantity'] ?? 0,
              ),
            )
            .toList();
      } catch (e) {
        _cacheDriver.delete(_storageKey);
      }
    }
  }
}

final cartStoreProvider = Provider<CartStore>((ref) {
  final cacheDriver = ref.watch(cacheDriverProvider);
  return CartStore(cacheDriver);
});
