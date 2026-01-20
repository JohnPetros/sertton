import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/add_to_cart_button_presenter.dart';

class AddToCartButtonView extends ConsumerWidget {
  final VoidCallback onAddToCart;

  const AddToCartButtonView({super.key, required this.onAddToCart});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(addToCartButtonPresenterProvider(onAddToCart));

    return Watch((context) {
      return GestureDetector(
        onTap: presenter.handlePress,
        child: Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.primary,
            borderRadius: BorderRadius.circular(18),
          ),
          child: Center(
            child: presenter.isLoading.value
                ? SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Theme.of(context).colorScheme.onPrimary,
                    ),
                  )
                : Icon(
                    Icons.shopping_cart,
                    size: 20,
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
          ),
        ),
      );
    });
  }
}
