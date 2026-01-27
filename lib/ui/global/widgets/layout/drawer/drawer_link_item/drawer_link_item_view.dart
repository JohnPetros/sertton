import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

class DrawerLinkItemView extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  final Color? color;

  const DrawerLinkItemView({
    super.key,
    required this.icon,
    required this.title,
    required this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: shadcn.GhostButton(
        onPressed: onTap,
        alignment: Alignment.centerLeft,
        leading: FaIcon(icon, size: 18, color: color),
        child: Text(
          title,
          style: color != null ? TextStyle(color: color) : null,
        ).medium(),
      ),
    );
  }
}
