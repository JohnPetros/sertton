import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/global/interfaces/internet_connection_driver.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/internet-connection-driver/index.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';

class OfflineScreenPresenter {
  final NavigationDriver _navigationDriver;
  final InternetConnectionDriver _connectionDriver;

  late final isChecking = signal<bool>(false);
  late final isIdle = computed<bool>(() => !isChecking.value);

  OfflineScreenPresenter(this._navigationDriver, this._connectionDriver);

  Future<void> tryReconnect() async {
    if (isChecking.value) return;

    isChecking.value = true;

    try {
      final hasInternet = await _connectionDriver.hasInternetAccess();

      if (hasInternet) {
        _navigationDriver.goTo(Routes.home);
      }
    } finally {
      isChecking.value = false;
    }
  }
}

final offlineScreenPresenterProvider =
    Provider.autoDispose<OfflineScreenPresenter>((ref) {
      final navigationDriver = ref.read(navigationDriverProvider);
      final connectionDriver = ref.read(internetConnectionDriverProvider);

      return OfflineScreenPresenter(navigationDriver, connectionDriver);
    });
