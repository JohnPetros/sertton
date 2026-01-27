import 'package:flutter/material.dart';

class DrawerMenuHeaderView extends StatelessWidget {
  const DrawerMenuHeaderView({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 24),
      alignment: Alignment.centerLeft,
      child: Image.asset(
        'assets/images/sertton-logo.png',
        height: 60,
        fit: BoxFit.contain,
      ),
    );
  }
}
