import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/product_info_presenter.dart';
import 'package:signals/signals_flutter.dart';

class ProductInfoView extends ConsumerWidget {
  final String skuCode;
  final String brandName;
  final String productName;
  final double salePrice;
  final double discountPrice;

  const ProductInfoView({
    super.key,
    required this.skuCode,
    required this.brandName,
    required this.productName,
    required this.salePrice,
    required this.discountPrice,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      productInfoPresenterProvider((
        skuCode: skuCode,
        brandName: brandName,
        productName: productName,
        salePrice: salePrice,
        discountPrice: discountPrice,
      )),
    );

    return Watch((context) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "SKU: $skuCode",
            style: TextStyle(
              color: Theme.of(context).colorScheme.primary,
              fontSize: 12,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            brandName.toUpperCase(),
            style: TextStyle(
              color: Theme.of(context).colorScheme.onSurfaceVariant,
              fontSize: 12,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            productName,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                presenter.displayPrice.value,
                style: TextStyle(
                  color: Theme.of(context).colorScheme.primary,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              if (presenter.hasDiscount.value) ...[
                const SizedBox(width: 8),
                Padding(
                  padding: const EdgeInsets.only(bottom: 2),
                  child: Text(
                    presenter.formattedSalePrice.value,
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                      fontSize: 12,
                      decoration: TextDecoration.lineThrough,
                    ),
                  ),
                ),
              ],
            ],
          ),
        ],
      );
    });
  }
}
