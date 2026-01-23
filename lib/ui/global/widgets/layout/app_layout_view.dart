import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sertton/core/catalog/stores/catalog_store.dart';
import 'package:sertton/core/checkout/stores/cart_store.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:sertton/ui/global/widgets/app-header/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;
import 'package:signals/signals_flutter.dart';

class AppLayoutView extends ConsumerWidget {
  final StatefulNavigationShell navigationShell;

  const AppLayoutView({super.key, required this.navigationShell});

  void _onTap(int index) {
    navigationShell.goBranch(index, initialLocation: true);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = shadcn.Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    final navigation = ref.read(navigationDriverProvider);
    final catalogStore = ref.read(catalogStoreProvider);

    return shadcn.Scaffold(
      headers: [
        Watch((context) {
          final query = catalogStore.query.value;
          final autoFocus = catalogStore.autoFocus.value;

          return AppHeader(
            initialValue: query,
            autoFocus: autoFocus,
            onSubmitted: (term) {
              catalogStore.setSearch(term);
              navigation.go(
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
      footers: [
        Container(
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
              _TabBarItem(
                icon: Icons.home_outlined,
                isActive: navigationShell.currentIndex == 0,
                onTap: () => _onTap(0),
                primaryColor: primaryColor,
              ),
              _TabBarItem(
                icon: Icons.search,
                isActive: navigationShell.currentIndex == 1,
                onTap: () => _onTap(1),
                primaryColor: primaryColor,
              ),
              Watch((context) {
                final cartStore = ref.watch(cartStoreProvider);
                final itemCount = cartStore.itemCount.value;

                return _TabBarItem(
                  icon: Icons.shopping_cart_outlined,
                  isActive: navigationShell.currentIndex == 2,
                  onTap: () => _onTap(2),
                  primaryColor: primaryColor,
                  badgeCount: itemCount > 0 ? itemCount : null,
                );
              }),
              _TabBarItem(
                icon: Icons.shopping_bag_outlined,
                isActive: navigationShell.currentIndex == 3,
                onTap: () => _onTap(3),
                primaryColor: primaryColor,
              ),
            ],
          ),
        ),
      ],
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
          key: ValueKey(navigationShell.currentIndex),
          child: navigationShell,
        ),
      ),
    );
  }
}

class _TabBarItem extends StatefulWidget {
  final IconData icon;
  final bool isActive;
  final VoidCallback onTap;
  final Color primaryColor;
  final int? badgeCount;

  const _TabBarItem({
    required this.icon,
    required this.isActive,
    required this.onTap,
    required this.primaryColor,
    this.badgeCount,
  });

  @override
  State<_TabBarItem> createState() => _TabBarItemState();
}

class _TabBarItemState extends State<_TabBarItem>
    with SingleTickerProviderStateMixin {
  late AnimationController _bounceController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _bounceController = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.9).animate(
      CurvedAnimation(parent: _bounceController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _bounceController.dispose();
    super.dispose();
  }

  void _handleTap() async {
    await _bounceController.forward();
    await _bounceController.reverse();
    widget.onTap();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeInOut,
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            color: widget.isActive ? widget.primaryColor : Colors.transparent,
            border: Border.all(color: widget.primaryColor, width: 2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Center(
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 200),
                  transitionBuilder: (child, animation) {
                    return ScaleTransition(
                      scale: animation,
                      child: FadeTransition(opacity: animation, child: child),
                    );
                  },
                  child: Icon(
                    widget.icon,
                    key: ValueKey(widget.isActive),
                    color: widget.isActive ? Colors.white : widget.primaryColor,
                    size: 28,
                  ),
                ),
              ),
              if (widget.badgeCount != null)
                Positioned(
                  right: -4,
                  top: -4,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: widget.isActive
                          ? Colors.white
                          : widget.primaryColor,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: widget.isActive
                            ? widget.primaryColor
                            : Colors.white,
                        width: 2,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.1),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    constraints: const BoxConstraints(
                      minWidth: 28,
                      minHeight: 28,
                    ),
                    child: Center(
                      child: Text(
                        '${widget.badgeCount}',
                        style: TextStyle(
                          color: widget.isActive
                              ? widget.primaryColor
                              : Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
