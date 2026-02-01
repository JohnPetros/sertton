import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';

class SplashScreenPresenter {
  final NavigationDriver _navigationDriver;
  Timer? _timer;

  SplashScreenPresenter(this._navigationDriver);

  void init() {
    _timer = Timer(const Duration(seconds: 2), _navigateToHome);
  }

  Future<void> _navigateToHome() async {
    _navigationDriver.go(Routes.home);
  }

  void dispose() {
    _timer?.cancel();
  }
}

final splashScreenPresenterProvider =
    Provider.autoDispose<SplashScreenPresenter>((ref) {
      final navigationDriver = ref.read(navigationDriverProvider);
      final presenter = SplashScreenPresenter(navigationDriver);

      ref.onDispose(() => presenter.dispose());

      return presenter;
    });
