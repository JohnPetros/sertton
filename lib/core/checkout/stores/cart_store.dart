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

  late final subtotal = computed(() {
    return items.value.fold<double>(
      0,
      (total, item) => total + (item.salePrice * item.quantity),
    );
  });

  late final totalDiscount = computed(() {
    return items.value.fold<double>(0, (total, item) {
      final discount = (item.salePrice - item.discountPrice) * item.quantity;
      return total + discount;
    });
  });

  late final total = computed(() {
    return items.value.fold<double>(
      0,
      (total, item) => total + (item.discountPrice * item.quantity),
    );
  });

  void addItem(CartItemDto item) {
    final existingIndex = items.value.indexWhere((i) => i.skuId == item.skuId);

    if (existingIndex != -1) {
      final existingItem = items.value[existingIndex];
      items.value[existingIndex] = existingItem.copyWith(
        quantity: existingItem.quantity + item.quantity,
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
      items.value[index] = items.value[index].copyWith(quantity: quantity);
      items.value = [...items.value];
      _saveToCache();
    }
  }

  void clear() {
    items.value = [];
    _saveToCache();
  }

  void _saveToCache() {
    final jsonList = items.value.map((i) => i.toMap()).toList();
    _cacheDriver.set(_storageKey, jsonEncode(jsonList));
  }

  void _loadFromCache() {
    final cachedData = _cacheDriver.get(_storageKey);
    if (cachedData != null) {
      try {
        final List<dynamic> jsonList = jsonDecode(cachedData);
        items.value = jsonList.map((i) => CartItemDto.fromMap(i)).toList();
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
