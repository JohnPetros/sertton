import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';

class SplashScreenPresenter {
  final NavigationDriver _navigationDriver;

  SplashScreenPresenter(this._navigationDriver);

  void init() {
    Timer(const Duration(seconds: 4), _navigateToHome);
  }

  Future<void> _navigateToHome() async {
    _navigationDriver.go(Routes.home);
  }
}

final splashScreenPresenterProvider =
    Provider.autoDispose<SplashScreenPresenter>((ref) {
      final navigationDriver = ref.read(navigationDriverProvider);
      return SplashScreenPresenter(navigationDriver);
    });
