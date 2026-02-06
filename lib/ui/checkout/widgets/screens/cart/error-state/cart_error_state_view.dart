import 'package:shadcn_flutter/shadcn_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart';

class CartErrorStateView extends StatelessWidget {
  final CartScreenPresenter presenter;

  const CartErrorStateView({super.key, required this.presenter});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            LucideIcons.circleAlert,
            size: 64,
            color: theme.colorScheme.destructive,
          ),
          const SizedBox(height: 16),
          Text(
            'Erro ao carregar o carrinho',
            style: theme.typography.h4.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            presenter.errorMessage.value,
            textAlign: TextAlign.center,
            style: theme.typography.small.copyWith(
              color: theme.colorScheme.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          PrimaryButton(
            onPressed: presenter.loadCartProducts,
            child: const Text('Tentar novamente'),
          ),
        ],
      ),
    );
  }
}
