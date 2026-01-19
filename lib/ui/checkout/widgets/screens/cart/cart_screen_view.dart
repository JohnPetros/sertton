import 'package:shadcn_flutter/shadcn_flutter.dart';

class CartScreenView extends StatelessWidget {
  const CartScreenView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      headers: const [AppBar(title: Text('Carrinho'))],
      child: Center(
        child: Text(
          'Tela de Carrinho',
          style: Theme.of(context).typography.large,
        ),
      ),
    );
  }
}
