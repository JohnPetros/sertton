import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/index.dart';
import 'package:sertton/ui/catalog/widgets/components/discount-badge/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/index.dart';
import 'package:signals/signals_flutter.dart';

class ProductCardView extends ConsumerWidget {
  final ProductDto product;
  final bool isColumn;

  const ProductCardView({
    super.key,
    required this.product,
    this.isColumn = false,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(productCardPresenterProvider(product));

    return Watch((context) {
      final content = [
        Stack(
          children: [
            ProductImage(
              imageUrl: presenter.imageUrl.value,
              size: isColumn ? 200 : 130,
            ),
            Positioned(
              top: 0,
              left: 0,
              child: DiscountBadge(
                salePrice: presenter.salePrice.value,
                discountPrice: presenter.discountPrice.value,
              ),
            ),
            Positioned(
              bottom: 4,
              right: 4,
              child: AddToCartButton(onAddToCart: presenter.handleAddToCart),
            ),
          ],
        ),
        if (isColumn) const SizedBox(height: 12) else const SizedBox(width: 12),
        isColumn
            ? ProductInfo(
                skuCode: presenter.firstSku.skuCode,
                brandName: product.brand.name,
                productName: product.name,
                salePrice: presenter.salePrice.value,
                discountPrice: presenter.discountPrice.value,
              )
            : Expanded(
                child: ProductInfo(
                  skuCode: presenter.firstSku.skuCode,
                  brandName: product.brand.name,
                  productName: product.name,
                  salePrice: presenter.salePrice.value,
                  discountPrice: presenter.discountPrice.value,
                ),
              ),
      ];

      return GestureDetector(
        onTap: () {
          presenter.navigateToProductDetails();
        },
        child: Card(
          padding: const EdgeInsets.all(12),
          child: isColumn
              ? Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: content,
                )
              : Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: content,
                ),
        ),
      );
    });
  }
}
