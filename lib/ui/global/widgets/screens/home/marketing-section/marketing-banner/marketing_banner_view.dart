import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-banner/marketing_banner_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-banner-skeleton/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MarketingBannerView extends ConsumerWidget {
  final BannerDto banner;

  const MarketingBannerView({super.key, required this.banner});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(marketingBannerPresenterProvider(banner));

    return Watch((context) {
      return Container(
        color: Theme.of(context).colorScheme.muted,
        child: AspectRatio(
          aspectRatio: 2.0,
          child: Image.network(
            presenter.imageUrl.value,
            fit: BoxFit.contain,
            loadingBuilder: (context, child, loadingProgress) {
              if (loadingProgress == null) return child;
              return const MarketingBannerSkeleton();
            },
            errorBuilder: (context, error, stackTrace) {
              return Center(
                child: Icon(
                  Icons.image_not_supported,
                  color: Theme.of(context).colorScheme.mutedForeground,
                ),
              );
            },
          ),
        ),
      );
    });
  }
}
