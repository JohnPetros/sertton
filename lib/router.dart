import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/index.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/index.dart';
import 'package:sertton/ui/global/widgets/layout/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/index.dart';
import 'package:sertton/ui/global/widgets/screens/splash/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/cart/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/index.dart';
import 'package:sertton/ui/institutional/widgets/screens/privacy_policy/index.dart';
import 'package:sertton/ui/institutional/widgets/screens/return_policy/index.dart';
import 'package:sertton/ui/institutional/widgets/screens/terms_conditions/index.dart';
import 'package:sertton/ui/institutional/widgets/screens/about_company/index.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: Routes.splash,
    routes: [
      GoRoute(
        path: Routes.splash,
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: Routes.privacyPolicy,
        builder: (context, state) => const PrivacyPolicyScreen(),
      ),
      GoRoute(
        path: Routes.returnPolicy,
        builder: (context, state) => const ReturnPolicyScreen(),
      ),
      GoRoute(
        path: Routes.terms,
        builder: (context, state) => const TermsConditionsScreen(),
      ),
      GoRoute(
        path: Routes.about,
        builder: (context, state) => const AboutCompanyScreen(),
      ),
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
                builder: (context, state) {
                  final extra = state.extra as Map<String, dynamic>?;
                  final focusSearch = extra?['focusSearch'] as bool? ?? false;
                  final initialQuery = extra?['initialQuery'] as String?;
                  return CatalogScreen(
                    focusSearch: focusSearch,
                    initialQuery: initialQuery,
                  );
                },
                routes: [
                  GoRoute(
                    path: ':productId',
                    builder: (context, state) {
                      final productId = state.pathParameters['productId']!;
                      final extra = state.extra;
                      final initialProduct =
                          extra is ProductDto ? extra : null;
                      return ProductScreen(
                        productId: productId,
                        initialProduct: initialProduct,
                      );
                    },
                  ),
                ],
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
