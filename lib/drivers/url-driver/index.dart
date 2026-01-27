import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:sertton/drivers/url-driver/url_launcher_url_driver.dart';

final urlDriverProvider = Provider<UrlDriver>((ref) {
  return UrlLauncherUrlDriver();
});
