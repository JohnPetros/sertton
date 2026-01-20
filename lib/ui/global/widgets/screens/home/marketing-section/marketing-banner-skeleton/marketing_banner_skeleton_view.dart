import 'package:shadcn_flutter/shadcn_flutter.dart';

class MarketingBannerSkeletonView extends StatelessWidget {
  const MarketingBannerSkeletonView({super.key});

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 2.0,
      child: Container(
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.muted,
          borderRadius: BorderRadius.zero,
        ),
      ),
    );
  }
}
