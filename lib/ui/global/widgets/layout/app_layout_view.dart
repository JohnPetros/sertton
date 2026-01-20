import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

class AppLayoutView extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const AppLayoutView({super.key, required this.navigationShell});

  void _onTap(int index) {
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = shadcn.Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Scaffold(
      body: AnimatedSwitcher(
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
      bottomNavigationBar: Container(
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
            _TabBarItem(
              icon: Icons.shopping_cart_outlined,
              isActive: navigationShell.currentIndex == 2,
              onTap: () => _onTap(2),
              primaryColor: primaryColor,
            ),
            _TabBarItem(
              icon: Icons.shopping_bag_outlined,
              isActive: navigationShell.currentIndex == 3,
              onTap: () => _onTap(3),
              primaryColor: primaryColor,
            ),
          ],
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

  const _TabBarItem({
    required this.icon,
    required this.isActive,
    required this.onTap,
    required this.primaryColor,
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
      ),
    );
  }
}
