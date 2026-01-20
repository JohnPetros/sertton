import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing_section_presenter.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-banner/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/marketing-collection/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class MarketingSectionView extends ConsumerWidget {
  const MarketingSectionView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(marketingSectionPresenterProvider);

    return Watch((context) {
      if (presenter.isLoading.value && presenter.items.value.isEmpty) {
        return const Column(
          children: [
            MarketingCollectionSkeleton(),
            MarketingBannerSkeleton(),
            MarketingCollectionSkeleton(),
          ],
        );
      }

      if (presenter.error.value != null && presenter.items.value.isEmpty) {
        return const Text("Erro ao carregar conteúdo");
      }

      final items = presenter.items.value;

      return ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: items.length,
        separatorBuilder: (context, index) => const SizedBox(height: 24),
        itemBuilder: (context, index) {
          final item = items[index];
          if (item is CollectionItem) {
            return MarketingCollection(collection: item.collection);
          } else if (item is BannerItem) {
            return MarketingBanner(banner: item.banner);
          }
          return const SizedBox.shrink();
        },
      );
    });
  }
}
