import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:sertton/drivers/url-driver/index.dart';

class DrawerMenuPresenter {
  final NavigationDriver _navigation;
  final UrlDriver _urlDriver;

  DrawerMenuPresenter({
    required NavigationDriver navigation,
    required UrlDriver urlDriver,
  }) : _navigation = navigation,
       _urlDriver = urlDriver;

  void navigateTo(String route) {
    _navigation.go(route);
  }

  Future<void> openUrl(String url, {String? fallbackUrl}) async {
    final uri = Uri.parse(url);
    final canLaunch = await _urlDriver.canLaunch(uri);

    if (canLaunch) {
      await _urlDriver.launch(uri);
    } else if (fallbackUrl != null) {
      final fallbackUri = Uri.parse(fallbackUrl);
      if (await _urlDriver.canLaunch(fallbackUri)) {
        await _urlDriver.launch(fallbackUri);
      }
    }
  }
}

final drawerMenuPresenterProvider = Provider.autoDispose((ref) {
  return DrawerMenuPresenter(
    navigation: ref.watch(navigationDriverProvider),
    urlDriver: ref.watch(urlDriverProvider),
  );
});
