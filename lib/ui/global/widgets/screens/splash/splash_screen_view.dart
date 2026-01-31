import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:lottie/lottie.dart';

import 'package:sertton/ui/global/widgets/screens/splash/splash_screen_presenter.dart';

class SplashScreenView extends ConsumerStatefulWidget {
  const SplashScreenView({super.key});

  @override
  ConsumerState<SplashScreenView> createState() => _SplashScreenViewState();
}

class _SplashScreenViewState extends ConsumerState<SplashScreenView> {
  @override
  void initState() {
    super.initState();
    ref.read(splashScreenPresenterProvider).init();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.colorScheme.surface,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SlideInLeft(
                  duration: const Duration(milliseconds: 800),
                  delay: const Duration(milliseconds: 800),
                  child: Spin(
                    duration: const Duration(milliseconds: 800),
                    child: Transform.rotate(
                      angle: -0.2,
                      child: FaIcon(
                        FontAwesomeIcons.bagShopping,
                        color: const Color(0xFF6DD0E4),
                        size: 32,
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: 240,
                  width: 240,
                  child: Lottie.asset(
                    'assets/lotties/truck.json',
                    fit: BoxFit.contain,
                  ),
                ),
                SlideInLeft(
                  duration: const Duration(milliseconds: 800),
                  delay: const Duration(milliseconds: 800),
                  child: Spin(
                    duration: const Duration(milliseconds: 800),
                    child: Transform.rotate(
                      angle: 0.2,
                      child: FaIcon(
                        FontAwesomeIcons.dollarSign,
                        color: const Color(0xFF6DD0E4),
                        size: 32,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            FadeInUp(
              duration: const Duration(milliseconds: 800),
              delay: const Duration(milliseconds: 800),
              child: Text(
                'Sertton',
                style: TextStyle(
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF6DD0E4),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
