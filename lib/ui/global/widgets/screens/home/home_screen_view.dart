import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/ui/global/widgets/screens/home/leads-capturer-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/index.dart';

class HomeScreenView extends ConsumerWidget {
  const HomeScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      child: SingleChildScrollView(
        child: Column(
          children: [
            MarketingSection(),
            LeadsCapturerSectionView(),
            const HomeFooterSection(),
          ],
        ),
      ),
    );
  }
}
