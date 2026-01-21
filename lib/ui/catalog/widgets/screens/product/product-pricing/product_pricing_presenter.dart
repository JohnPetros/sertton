import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:signals/signals.dart';

class ProductPricingPresenter {
  final double originalPrice;
  final double currentPrice;

  late final hasDiscount = computed(() => originalPrice > currentPrice);
  late final formattedOriginalPrice = computed(
    () => NumberFormat.currency(
      locale: 'pt_BR',
      symbol: 'R\$',
    ).format(originalPrice),
  );
  late final formattedCurrentPrice = computed(
    () => NumberFormat.currency(
      locale: 'pt_BR',
      symbol: 'R\$',
    ).format(currentPrice),
  );

  ProductPricingPresenter({
    required this.originalPrice,
    required this.currentPrice,
  });
}

final productPricingPresenterProvider = Provider.autoDispose
    .family<
      ProductPricingPresenter,
      ({double originalPrice, double currentPrice})
    >(
      (ref, props) => ProductPricingPresenter(
        originalPrice: props.originalPrice,
        currentPrice: props.currentPrice,
      ),
    );
