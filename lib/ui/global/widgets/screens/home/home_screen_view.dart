import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/index.dart';
import 'package:sertton/ui/global/widgets/screens/home/marketing-section/index.dart';

class HomeScreenView extends ConsumerWidget {
  const HomeScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final navigation = ref.read(navigationDriverProvider);

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: AppSearchBar(
                onSubmitted: (term) => navigation.go(
                  Routes.catalog,
                  data: {'focusSearch': term.isEmpty, 'initialQuery': term},
                ),
              ),
            ),
            const MarketingSection(),
            // Placeholder for Leads Capture
            // Placeholder for Footer
          ],
        ),
      ),
    );
  }
}
