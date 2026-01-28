import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/url_driver.dart';
import 'package:sertton/drivers/url-driver/index.dart';

class AboutCompanyPresenter {
  final UrlDriver _urlDriver;

  AboutCompanyPresenter(this._urlDriver);

  Future<void> openContact(String url) async {
    final uri = Uri.parse(url);
    if (await _urlDriver.canLaunch(uri)) {
      await _urlDriver.launch(uri);
    }
  }
}

final aboutCompanyPresenterProvider =
    Provider.autoDispose<AboutCompanyPresenter>((ref) {
      final urlDriver = ref.watch(urlDriverProvider);
      return AboutCompanyPresenter(urlDriver);
    });
