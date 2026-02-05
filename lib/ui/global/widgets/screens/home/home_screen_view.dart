import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/drivers/env-driver/index.dart';
import 'package:sertton/rest/rest_client.dart';
import 'package:sertton/ui/global/widgets/screens/home/leads-capturer-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/index.dart';

// ✅ Provider só pra testar o GET
final testGetProvider = FutureProvider.autoDispose((ref) async {
  final restClient = ref.read(restClientProvider);
  // Ideal: tipar o retorno no seu RestClient (ex.: Map<String, dynamic>)
  return restClient.get('https://jsonplaceholder.typicode.com/posts/1');
});

class HomeScreenView extends ConsumerWidget {
  const HomeScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final envDriver = ref.read(envDriverProvider);
    final testGet = ref.watch(testGetProvider);
    final restClient = ref.read(restClientProvider);
    return Scaffold(
      child: SingleChildScrollView(
        child: Column(
          children: [
            Text("YAMPI_API_URL: ${envDriver.get('YAMPI_API_URL')}"),
            Text("YAMPI_PURCHASE_URL: ${envDriver.get('YAMPI_PURCHASE_URL')}"),
            Text("YAMPI_USER_TOKEN: ${envDriver.get('YAMPI_USER_TOKEN')}"),
            Text("YAMPI_SECRET_KEY: ${envDriver.get('YAMPI_SECRET_KEY')}"),
            Text("Base URL: ${restClient.getBaseUrl()}"),

            // ✅ Renderiza o estado do GET
            testGet.when(
              loading: () => const Text('Test GET: loading...'),
              error: (e, st) => Text('Test GET: error: $e'),
              data: (data) => Text('Test GET: ok: $data'),
            ),

            const MarketingSection(),
            const LeadsCapturerSectionView(),
            const HomeFooterSection(),
          ],
        ),
      ),
    );
  }
}
