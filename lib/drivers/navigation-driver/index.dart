import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/go_router_navigation_driver.dart';
import 'package:sertton/router.dart';

final navigationDriverProvider = Provider<NavigationDriver>((ref) {
  final router = ref.watch(routerProvider);
  return GoRouterNavigationDriver(router);
});
