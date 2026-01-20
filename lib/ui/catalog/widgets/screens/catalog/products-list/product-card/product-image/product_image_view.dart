import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/product_image_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class ProductImageView extends ConsumerWidget {
  final String imageUrl;
  final double size;

  const ProductImageView({super.key, required this.imageUrl, this.size = 100});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(productImagePresenterProvider(imageUrl));

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.primaryForeground,
        borderRadius: BorderRadius.circular(8),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Watch((context) {
          if (presenter.hasError.value) {
            return Center(
              child: Icon(
                Icons.image_not_supported,
                color: Theme.of(context).colorScheme.secondaryForeground,
              ),
            );
          }

          return Image.network(
            imageUrl,
            fit: BoxFit.cover,
            width: size,
            height: size,
            loadingBuilder: (context, child, loadingProgress) {
              if (loadingProgress == null) {
                WidgetsBinding.instance.addPostFrameCallback((_) {
                  presenter.onLoadComplete();
                });
                return child;
              }
              return const Center(
                child: SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(strokeWidth: 2),
                ),
              );
            },
            errorBuilder: (context, error, stackTrace) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                presenter.onLoadError();
              });
              return Center(
                child: Icon(
                  Icons.image_not_supported,
                  color: Theme.of(context).colorScheme.secondaryForeground,
                ),
              );
            },
          );
        }),
      ),
    );
  }
}
