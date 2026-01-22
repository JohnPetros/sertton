import 'package:shadcn_flutter/shadcn_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/cart/cart-item-card/cart_item_card_skeleton_view.dart';

class CartLoadingStateView extends StatelessWidget {
  const CartLoadingStateView({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 3,
      itemBuilder: (context, index) {
        return const Padding(
          padding: EdgeInsets.only(bottom: 16),
          child: CartItemCardSkeletonView(),
        );
      },
    );
  }
}
