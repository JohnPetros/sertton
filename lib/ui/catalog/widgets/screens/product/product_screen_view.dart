import 'package:sertton/ui/catalog/widgets/components/shortage-time-counter/index.dart';
import 'package:sertton/ui/catalog/widgets/components/sku-selector/index.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-image-viewer/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-header/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-pricing/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-description/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product_screen_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class ProductScreenView extends ConsumerWidget {
  final String productId;

  const ProductScreenView({super.key, required this.productId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(productScreenPresenterProvider(productId));
    final theme = Theme.of(context);

    return Watch((context) {
      if (presenter.isLoading.value) {
        return const Scaffold(
          child: Center(child: CircularProgressIndicator()),
        );
      }

      if (presenter.hasError.value || presenter.product.value == null) {
        return Scaffold(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  RadixIcons.exclamationTriangle,
                  size: 48,
                  color: theme.colorScheme.destructive,
                ),
                const SizedBox(height: 16),
                Text('Erro ao carregar produto', style: theme.typography.large),
                const SizedBox(height: 16),
                Button.primary(
                  onPressed: presenter.retry,
                  child: const Text('Tentar novamente'),
                ),
              ],
            ),
          ),
        );
      }

      final product = presenter.product.value!;
      final sku = presenter.activeSku.value!;

      return Scaffold(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ProductImageViewer(
                imageUrl: presenter.imageUrl.value,
                productName: product.name,
              ),

              const SizedBox(height: 24),

              ProductHeader(skuCode: sku.skuCode, title: product.name),

              const SizedBox(height: 16),

              ProductPricing(
                originalPrice: sku.salePrice,
                currentPrice: sku.discountPrice,
              ),

              const SizedBox(height: 24),

              SkuSelector(
                variationLabel: presenter.variationLabel.value,
                variationOptions: presenter.variationOptions.value,
                selectedVariationValue: presenter.selectedVariationValue.value,
                quantity: presenter.quantity.value,
                maxQuantity: presenter.maxQuantity.value,
                onVariationSelected: presenter.selectSkuByVariation,
                onQuantityChanged: presenter.updateQuantity,
              ),
              const SizedBox(height: 24),

              ShortageTimeCounter(stock: sku.stock),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity,
                child: Button.primary(
                  onPressed: presenter.canAddToCart.value
                      ? presenter.handleAddToCart
                      : null,
                  child: presenter.isAddingToCart.value
                      ? const SizedBox(
                          height: 22,
                          width: 22,
                          child: CircularProgressIndicator(
                            strokeWidth: 1,
                            color: Colors.white,
                          ),
                        )
                      : Text(
                          style: const TextStyle(fontSize: 16),
                          presenter.isOutOfStock.value
                              ? 'INDISPONÍVEL'
                              : 'ADICIONAR AO CARRINHO',
                        ),
                ),
              ),

              const SizedBox(height: 48),

              ProductDescriptionView(product: product),

              const SizedBox(height: 48),
            ],
          ),
        ),
      );
    });
  }
}
