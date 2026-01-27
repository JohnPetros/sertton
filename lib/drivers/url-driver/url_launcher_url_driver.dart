import 'package:url_launcher/url_launcher.dart' as url_launcher;

import 'package:sertton/core/global/interfaces/url_driver.dart';

class UrlLauncherUrlDriver implements UrlDriver {
  @override
  Future<void> launch(Uri uri) async {
    try {
      await url_launcher.launchUrl(
        uri,
        mode: url_launcher.LaunchMode.externalApplication,
      );
    } on Exception {
      rethrow;
    }
  }

  @override
  Future<bool> canLaunch(Uri uri) async {
    return await url_launcher.canLaunchUrl(uri);
  }
}
