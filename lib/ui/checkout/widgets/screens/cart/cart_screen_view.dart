import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/cart/cart-summary/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/loading-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/error-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/empty-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/cart-content/index.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/index.dart';

class CartScreenView extends ConsumerWidget {
  const CartScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(cartScreenPresenterProvider);

    return Scaffold(
      headers: [AppBar(title: const AppSearchBar())],
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        child: Column(
          children: [
            Expanded(
              child: Watch((context) {
                if (presenter.isLoading.value) {
                  return const CartLoadingState();
                }

                if (presenter.hasError.value) {
                  return CartErrorState(presenter: presenter);
                }

                if (presenter.isEmpty.value) {
                  return const CartEmptyState();
                }

                return CartContent(presenter: presenter);
              }),
            ),

            Watch((context) {
              return CartSummary(
                itemCount: presenter.itemCount.value,
                subtotal: presenter.subtotal.value,
                discount: presenter.totalDiscount.value,
                total: presenter.total.value,
                onCheckout: presenter.checkout,
                isCheckoutEnabled: presenter.canCheckout.value,
              );
            }),
          ],
        ),
      ),
    );
  }
}
