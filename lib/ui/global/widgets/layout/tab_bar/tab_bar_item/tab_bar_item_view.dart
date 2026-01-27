import 'package:flutter/material.dart';

class TabBarItemView extends StatefulWidget {
  final IconData icon;
  final bool isActive;
  final VoidCallback onTap;
  final Color primaryColor;
  final int? badgeCount;

  const TabBarItemView({
    super.key,
    required this.icon,
    required this.isActive,
    required this.onTap,
    required this.primaryColor,
    this.badgeCount,
  });

  @override
  State<TabBarItemView> createState() => _TabBarItemViewState();
}

class _TabBarItemViewState extends State<TabBarItemView>
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
