import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart';

class ProductListView extends ConsumerWidget {
  const ProductListView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(presenterProvider);

    return Column(
      children: [
        ElevatedButton(
          onPressed: presenter.handleTap,
          child: Text("Fazer fetch"),
        ),
      ],
    );
  }
}
