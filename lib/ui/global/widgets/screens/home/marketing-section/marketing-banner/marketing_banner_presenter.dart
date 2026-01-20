import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import 'package:signals/signals.dart';

class MarketingBannerPresenter {
  final BannerDto banner;

  late final imageUrl = signal<String>('https:${banner.imageUrl}');

  MarketingBannerPresenter(this.banner);
}

final marketingBannerPresenterProvider = Provider.autoDispose
    .family<MarketingBannerPresenter, BannerDto>((ref, banner) {
      return MarketingBannerPresenter(banner);
    });
