import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sertton/ui/catalog/stores/catalog_store.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:sertton/ui/global/widgets/app-header/index.dart';
import 'package:sertton/ui/global/widgets/layout/drawer/index.dart';
import 'package:sertton/ui/global/widgets/layout/tab_bar/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;
import 'package:signals/signals_flutter.dart';

class AppLayoutView extends ConsumerWidget {
  final StatefulNavigationShell navigationShell;

  const AppLayoutView({super.key, required this.navigationShell});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final navigation = ref.read(navigationDriverProvider);
    final catalogStore = ref.read(catalogStoreProvider);

    return Scaffold(
      drawer: const DrawerMenu(),
      body: shadcn.Scaffold(
        headers: [
          Watch((context) {
            final query = catalogStore.query.value;
            final autoFocus = catalogStore.autoFocus.value;

            return AppHeader(
              initialValue: query,
              autoFocus: autoFocus,
              onMenuPressed: () {
                Scaffold.of(context).openDrawer();
              },
              onSubmitted: (term) {
                catalogStore.setSearch(term);
                navigation.goTo(
                  Routes.catalog,
                  data: {'focusSearch': term.isEmpty, 'initialQuery': term},
                );
              },
              onChanged: (value) {
                if (value.isEmpty && navigationShell.currentIndex == 1) {
                  catalogStore.clearSearch();
                }
              },
            );
          }),
        ],
        footers: [AppTabBar(navigationShell: navigationShell)],
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          switchInCurve: Curves.easeInOut,
          switchOutCurve: Curves.easeInOut,
          transitionBuilder: (child, animation) {
            return FadeTransition(
              opacity: animation,
              child: SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0.05, 0),
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              ),
            );
          },
          child: KeyedSubtree(
            key: ValueKey(
              '${navigationShell.currentIndex}_${GoRouterState.of(context).uri.path}',
            ),
            child: navigationShell,
          ),
        ),
      ),
    );
  }
}
