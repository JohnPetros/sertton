abstract class NavigationDriver {
  void go(String route, {Object? data});
  void back();
  bool canGoBack();
}
