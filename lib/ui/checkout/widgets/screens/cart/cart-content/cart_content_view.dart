import 'package:shadcn_flutter/shadcn_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/cart/cart-item-card/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart';

class CartContentView extends StatelessWidget {
  final CartScreenPresenter presenter;

  const CartContentView({super.key, required this.presenter});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      children: [
        // Header
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Meu Carrinho',
              style: theme.typography.h3.copyWith(fontWeight: FontWeight.bold),
            ),
            Button.ghost(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (dialogContext) => AlertDialog(
                    title: const Text('Limpar carrinho'),
                    content: const Text(
                      'Tem certeza que deseja remover todos os itens do carrinho?',
                    ),
                    actions: [
                      Button.ghost(
                        onPressed: () => Navigator.of(dialogContext).pop(),
                        child: const Text('Cancelar'),
                      ),
                      PrimaryButton(
                        onPressed: () {
                          presenter.clearCart();
                          Navigator.of(dialogContext).pop();
                        },
                        child: const Text('Limpar'),
                      ),
                    ],
                  ),
                );
              },
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(LucideIcons.trash2, size: 16),
                  const SizedBox(width: 8),
                  const Text('Limpar carrinho'),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),

        // Cart Items List
        Expanded(
          child: ListView.builder(
            itemCount: presenter.cartDisplayItems.value.length,
            itemBuilder: (context, index) {
              final item = presenter.cartDisplayItems.value[index];
              return Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: CartItemCard(
                  imageUrl: item.imageUrl,
                  skuCode: item.skuCode,
                  name: item.name,
                  variationName: item.variationName,
                  variationValue: item.variationValue,
                  salePrice: item.salePrice,
                  discountPrice: item.discountPrice,
                  quantity: item.quantity,
                  maxQuantity: item.maxQuantity,
                  onQuantityChanged: (newQuantity) {
                    presenter.updateItemQuantity(item.skuId, newQuantity);
                  },
                  onRemove: () {
                    presenter.removeItem(item.skuId);
                  },
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
