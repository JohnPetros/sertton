import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';

class InstitutionalScaffoldPresenter {
  final NavigationDriver _navigationDriver;

  InstitutionalScaffoldPresenter(this._navigationDriver);

  void onBack() {
    if (_navigationDriver.canGoBack()) {
      _navigationDriver.back();
    } else {
      _navigationDriver.go('/');
    }
  }
}

final institutionalScaffoldPresenterProvider =
    Provider.autoDispose<InstitutionalScaffoldPresenter>((ref) {
      final navigationDriver = ref.watch(navigationDriverProvider);
      return InstitutionalScaffoldPresenter(navigationDriver);
    });
