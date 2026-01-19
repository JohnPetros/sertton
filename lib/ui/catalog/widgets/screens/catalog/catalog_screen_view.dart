import 'package:shadcn_flutter/shadcn_flutter.dart';

class CatalogScreenView extends StatelessWidget {
  const CatalogScreenView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      headers: const [AppBar(title: Text('Catálogo'))],
      child: Center(
        child: Text(
          'Tela de Catálogo',
          style: Theme.of(context).typography.large,
        ),
      ),
    );
  }
}
