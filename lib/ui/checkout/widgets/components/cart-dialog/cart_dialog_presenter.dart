import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/dtos/sku_dto.dart';
import 'package:sertton/core/checkout/dtos/cart_item_dto.dart';
import 'package:sertton/core/checkout/stores/cart_store.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';

import 'package:sertton/drivers/navigation-driver/index.dart';

class CartDialogPresenter {
  final ProductDto product;
  final CartStore _cartStore;
  final NavigationDriver _navigationDriver;
  static const String variationLabel = 'MATERIAL';

  final selectedSku = signal<SkuDto?>(null);
  final quantity = signal<int>(1);
  final isSubmitting = signal<bool>(false);

  late final variationOptions = computed(() {
    return product.skus
        .map((sku) => _getVariationValue(sku))
        .where((value) => value.isNotEmpty)
        .toSet()
        .toList();
  });

  late final selectedVariationValue = computed(() {
    final sku = selectedSku.value;
    if (sku == null) return null;
    return _getVariationValue(sku);
  });

  late final maxQuantity = computed(() => selectedSku.value?.stock ?? 0);
  late final isOutOfStock = computed(() => maxQuantity.value <= 0);
  late final canAdd = computed(
    () =>
        !isOutOfStock.value && !isSubmitting.value && selectedSku.value != null,
  );

  CartDialogPresenter({
    required this.product,
    required CartStore cartStore,
    required NavigationDriver navigationDriver,
  }) : _cartStore = cartStore,
       _navigationDriver = navigationDriver {
    if (product.skus.isNotEmpty) {
      selectedSku.value = product.skus.first;
    }
  }

  void selectSku(String variationValue) {
    try {
      final sku = product.skus.firstWhere(
        (sku) => _getVariationValue(sku) == variationValue,
      );
      selectedSku.value = sku;
      quantity.value = 1;
    } catch (_) {}
  }

  void setQuantity(int val) {
    quantity.value = val;
  }

  String _getVariationValue(SkuDto sku) {
    try {
      final variation = sku.variations.firstWhere(
        (v) => v.name.toLowerCase() == variationLabel.toLowerCase(),
      );
      return variation.value;
    } catch (_) {
      return sku.variations.isNotEmpty ? sku.variations.first.value : '';
    }
  }

  Future<void> addToCart() async {
    final sku = selectedSku.value;
    if (sku == null) return;

    isSubmitting.value = true;

    _cartStore.addItem(
      CartItemDto(
        productSlug: product.slug,
        skuId: sku.id,
        name: product.name,
        imageUrl: sku.imageUrl.isNotEmpty ? sku.imageUrl : product.imageUrl,
        variationValue: sku.variations.map((v) => v.value).join(', '),
        salePrice: sku.salePrice,
        discountPrice: sku.discountPrice,
        quantity: quantity.value,
      ),
    );

    isSubmitting.value = false;
    _navigationDriver.back();
    _navigationDriver.go(Routes.cart);
  }
}

final cartDialogPresenterProvider = Provider.autoDispose
    .family<CartDialogPresenter, ProductDto>((ref, product) {
      final cartStore = ref.watch(cartStoreProvider);
      final navigationDriver = ref.read(navigationDriverProvider);
      return CartDialogPresenter(
        product: product,
        cartStore: cartStore,
        navigationDriver: navigationDriver,
      );
    });
