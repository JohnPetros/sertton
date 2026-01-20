import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:signals/signals.dart';

class ProductInfoPresenter {
  final String skuCode;
  final String brandName;
  final String productName;
  final double salePrice;
  final double discountPrice;

  late final hasDiscount = computed(() => discountPrice < salePrice);

  late final formattedSalePrice = computed(() => _formatCurrency(salePrice));

  late final formattedDiscountPrice = computed(
    () => _formatCurrency(discountPrice),
  );

  late final displayPrice = computed(
    () => hasDiscount.value
        ? formattedDiscountPrice.value
        : formattedSalePrice.value,
  );

  ProductInfoPresenter({
    required this.skuCode,
    required this.brandName,
    required this.productName,
    required this.salePrice,
    required this.discountPrice,
  });

  String _formatCurrency(double value) {
    return NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$').format(value);
  }
}

final productInfoPresenterProvider = Provider.autoDispose
    .family<
      ProductInfoPresenter,
      ({
        String skuCode,
        String brandName,
        String productName,
        double salePrice,
        double discountPrice,
      })
    >((ref, props) {
      return ProductInfoPresenter(
        skuCode: props.skuCode,
        brandName: props.brandName,
        productName: props.productName,
        salePrice: props.salePrice,
        discountPrice: props.discountPrice,
      );
    });
