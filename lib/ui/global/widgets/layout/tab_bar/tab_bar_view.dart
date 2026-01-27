import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sertton/ui/checkout/stores/cart_store.dart';
import 'package:sertton/ui/global/widgets/layout/tab_bar/tab_bar_item/index.dart';
import 'package:sertton/ui/global/widgets/layout/tab_bar/tab_bar_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;
import 'package:signals/signals_flutter.dart';

class TabBarView extends ConsumerWidget {
  final StatefulNavigationShell navigationShell;

  const TabBarView({super.key, required this.navigationShell});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = shadcn.Theme.of(context);
    final primaryColor = theme.colorScheme.primary;
    final presenter = ref.read(tabBarPresenterProvider(navigationShell));

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          TabBarItem(
            icon: Icons.home_outlined,
            isActive: presenter.currentIndex == 0,
            onTap: () => presenter.onTabSelected(0),
            primaryColor: primaryColor,
          ),
          TabBarItem(
            icon: Icons.search,
            isActive: presenter.currentIndex == 1,
            onTap: () => presenter.onTabSelected(1),
            primaryColor: primaryColor,
          ),
          Watch((context) {
            final cartStore = ref.watch(cartStoreProvider);
            final itemCount = cartStore.itemCount.value;

            return TabBarItem(
              icon: Icons.shopping_cart_outlined,
              isActive: presenter.currentIndex == 2,
              onTap: () => presenter.onTabSelected(2),
              primaryColor: primaryColor,
              badgeCount: itemCount > 0 ? itemCount : null,
            );
          }),
          TabBarItem(
            icon: Icons.shopping_bag_outlined,
            isActive: presenter.currentIndex == 3,
            onTap: () => presenter.onTabSelected(3),
            primaryColor: primaryColor,
          ),
        ],
      ),
    );
  }
}
