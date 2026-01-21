import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';

import 'package:sertton/ui/catalog/widgets/components/sku-selector/sku_selector_view.dart';
import 'package:sertton/ui/checkout/widgets/components/cart-dialog/cart_dialog_presenter.dart';

class CartDialogView extends ConsumerWidget {
  final ProductDto product;
  final void Function() onClose;

  const CartDialogView({
    super.key,
    required this.product,
    required this.onClose,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(cartDialogPresenterProvider(product));

    return AlertDialog(
      title: Text(product.name),
      content: Watch((context) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SkuSelectorView(
              variationLabel: CartDialogPresenter.variationLabel,
              variationOptions: presenter.variationOptions.value,
              selectedVariationValue: presenter.selectedVariationValue.value,
              quantity: presenter.quantity.value,
              maxQuantity: presenter.maxQuantity.value,
              onVariationSelected: presenter.selectSku,
              onQuantityChanged: presenter.setQuantity,
            ),
          ],
        );
      }),
      actions: [
        OutlineButton(onPressed: onClose, child: const Text('Cancelar')),
        Watch((context) {
          final isOutOfStock = presenter.isOutOfStock.value;
          final isSubmitting = presenter.isSubmitting.value;

          return PrimaryButton(
            onPressed: presenter.canAdd.value ? presenter.addToCart : null,
            child: isSubmitting
                ? const SizedBox(
                    height: 20,
                    width: 20,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : Text(isOutOfStock ? 'Indisponível' : 'Adicionar ao Carrinho'),
          );
        }),
      ],
    );
  }
}

Future<void> showCartDialog(
  BuildContext context,
  ProductDto product,
  NavigationDriver navigationDriver,
) {
  return showDialog(
    context: context,
    builder: (context) {
      return CartDialogView(
        product: product,
        onClose: () => navigationDriver.back(),
      );
    },
  );
}
