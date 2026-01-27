import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class TabBarPresenter {
  final StatefulNavigationShell _navigationShell;

  TabBarPresenter({required StatefulNavigationShell navigationShell})
    : _navigationShell = navigationShell;

  int get currentIndex => _navigationShell.currentIndex;

  void onTabSelected(int index) {
    _navigationShell.goBranch(index, initialLocation: true);
  }
}

final tabBarPresenterProvider = Provider.autoDispose
    .family<TabBarPresenter, StatefulNavigationShell>((ref, navigationShell) {
      return TabBarPresenter(navigationShell: navigationShell);
    });
