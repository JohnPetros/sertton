import 'package:go_router/go_router.dart';

import 'package:sertton/core/global/interfaces/navigation_driver.dart';

class GoRouterNavigationDriver implements NavigationDriver {
  final GoRouter _router;

  GoRouterNavigationDriver(this._router);

  @override
  void go(String route) {
    _router.go(route);
  }

  @override
  void back() {
    if (_router.canPop()) {
      _router.pop();
    }
  }
}
