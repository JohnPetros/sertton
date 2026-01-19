import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/index.dart';
import 'package:sertton/ui/global/widgets/layout/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/widgets/screens/orders/index.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: Routes.home,
    routes: [
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return AppLayout(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Routes.home,
                builder: (context, state) => const HomeScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Routes.catalog,
                builder: (context, state) => const CatalogScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Routes.cart,
                builder: (context, state) => const CartScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Routes.orders,
                builder: (context, state) => const OrdersScreen(),
              ),
            ],
          ),
        ],
      ),
    ],
  );
});
