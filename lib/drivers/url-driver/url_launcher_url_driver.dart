import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

class UrlLauncherUrlDriver implements UrlDriver {
  @override
  Future<void> launch(Uri uri) async {
    await url_launcher.launchUrl(
      uri,
      mode: url_launcher.LaunchMode.externalApplication,
    );
  }

  @override
  Future<bool> canLaunch(Uri uri) async {
    return await url_launcher.canLaunchUrl(uri);
  }
}
