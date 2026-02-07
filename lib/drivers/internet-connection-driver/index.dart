import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:internet_connection_checker_plus/internet_connection_checker_plus.dart';

import 'package:sertton/core/global/interfaces/internet_connection_driver.dart';
import 'package:sertton/drivers/internet-connection-driver/internet_connection_checker_plus_driver.dart';

final internetConnectionDriverProvider = Provider<InternetConnectionDriver>((
  ref,
) {
  final connection = InternetConnection.createInstance(
    checkInterval: const Duration(seconds: 3),
  );
  return InternetConnectionCheckerPlusDriver(connection);
});
