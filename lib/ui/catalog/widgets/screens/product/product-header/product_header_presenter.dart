import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class ProductHeaderPresenter {
  final String skuCode;
  final String title;

  late final formattedSkuCode = computed(() => 'SKU: $skuCode');

  ProductHeaderPresenter({required this.skuCode, required this.title});
}

final productHeaderPresenterProvider = Provider.autoDispose
    .family<ProductHeaderPresenter, ({String skuCode, String title})>(
      (ref, props) =>
          ProductHeaderPresenter(skuCode: props.skuCode, title: props.title),
    );
