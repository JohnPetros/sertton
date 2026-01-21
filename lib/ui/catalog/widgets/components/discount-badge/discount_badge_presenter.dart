import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class DiscountBadgePresenter {
  final double salePrice;
  final double discountPrice;

  late final isVisible = computed(() => discountPrice < salePrice);
  late final percentage = computed(
    () => ((salePrice - discountPrice) / salePrice * 100).round(),
  );
  late final formattedText = computed(() => "↓ ${percentage.value} %");

  DiscountBadgePresenter({
    required this.salePrice,
    required this.discountPrice,
  });
}

final discountBadgePresenterProvider = Provider.autoDispose
    .family<DiscountBadgePresenter, ({double salePrice, double discountPrice})>(
      (ref, props) {
        return DiscountBadgePresenter(
          salePrice: props.salePrice,
          discountPrice: props.discountPrice,
        );
      },
    );
