import 'package:go_router/go_router.dart';

import 'package:sertton/core/global/interfaces/navigation_driver.dart';

class GoRouterNavigationDriver implements NavigationDriver {
  final GoRouter _router;

  GoRouterNavigationDriver(this._router);

  @override
  void goTo(String route, {Object? data}) {
    _router.go(route, extra: data);
  }

  @override
  void goBack() {
    if (_router.canPop()) {
      _router.pop();
    }
  }

  @override
  bool canGoBack() {
    return _router.canPop();
  }
}
