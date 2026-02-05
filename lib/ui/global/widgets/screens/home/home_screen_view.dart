import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/drivers/env-driver/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/leads-capturer-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/index.dart';

class HomeScreenView extends ConsumerWidget {
  const HomeScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final envDriver = ref.read(envDriverProvider);
    return Scaffold(
      child: SingleChildScrollView(
        child: Column(
          children: [
            Text(
              "YAMPI_API_URLYAMPI_API_URL: ${envDriver.get('YAMPI_API_URLYAMPI_API_URL')}",
            ),
            Text("YAMPI_PURCHASE_URL: ${envDriver.get('YAMPI_PURCHASE_URL')}"),
            Text("YAMPI_USER_TOKEN: ${envDriver.get('YAMPI_USER_TOKEN')}"),
            Text("YAMPI_SECRET_KEY: ${envDriver.get('YAMPI_SECRET_KEY')}"),
            MarketingSection(),
            LeadsCapturerSectionView(),
            const HomeFooterSection(),
          ],
        ),
      ),
    );
  }
}
