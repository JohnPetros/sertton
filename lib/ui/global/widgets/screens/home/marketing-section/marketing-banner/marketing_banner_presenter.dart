import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import 'package:signals/signals.dart';

class MarketingBannerPresenter {
  final BannerDto banner;

  late final imageUrl = signal<String>(_sanitizeUrl(banner.imageUrl));

  MarketingBannerPresenter(this.banner);

  String _sanitizeUrl(String url) {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:$url';
    return url;
  }
}

final marketingBannerPresenterProvider = Provider.autoDispose
    .family<MarketingBannerPresenter, BannerDto>((ref, banner) {
      return MarketingBannerPresenter(banner);
    });
