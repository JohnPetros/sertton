import 'package:internet_connection_checker_plus/internet_connection_checker_plus.dart';

import 'package:sertton/core/global/interfaces/internet_connection_driver.dart';

class InternetConnectionCheckerPlusDriver implements InternetConnectionDriver {
  final InternetConnection _connection;

  InternetConnectionCheckerPlusDriver(this._connection);

  @override
  Future<bool> hasInternetAccess() async {
    return await _connection.hasInternetAccess;
  }

  @override
  Stream<bool> onStatusChange() {
    return _connection.onStatusChange
        .map((status) => status == InternetStatus.connected)
        .distinct();
  }
}
