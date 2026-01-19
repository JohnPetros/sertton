import 'package:shadcn_flutter/shadcn_flutter.dart';

class OrdersScreenView extends StatelessWidget {
  const OrdersScreenView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      headers: const [AppBar(title: Text('Pedidos'))],
      child: Center(
        child: Text(
          'Tela de Pedidos',
          style: Theme.of(context).typography.large,
        ),
      ),
    );
  }
}
