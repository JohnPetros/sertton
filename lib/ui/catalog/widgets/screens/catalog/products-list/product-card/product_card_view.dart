import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class ProductCardView extends ConsumerWidget {
  final ProductDto product;

  const ProductCardView({super.key, required this.product});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(productCardPresenterProvider(product));

    return GestureDetector(
      onTap: () {
        // Navigate to product details
      },
      child: Card(
        padding: const EdgeInsets.all(12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                ProductImage(imageUrl: presenter.imageUrl.value, size: 130),
                Positioned(
                  top: 0,
                  left: 0,
                  child: DiscountBadge(
                    salePrice: presenter.salePrice.value,
                    discountPrice: presenter.discountPrice.value,
                  ),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: AddToCartButton(
                    onAddToCart: presenter.handleAddToCart,
                  ),
                ),
              ],
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ProductInfo(
                skuCode: presenter.firstSku.skuCode,
                brandName: product.brand.name,
                productName: product.name,
                salePrice: presenter.salePrice.value,
                discountPrice: presenter.discountPrice.value,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
