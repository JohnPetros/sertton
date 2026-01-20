import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/ui/global/widgets/screens/home/marketing-section/index.dart';

class HomeScreenView extends ConsumerWidget {
  const HomeScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Placeholder for Header
            MarketingSection(),
            // Placeholder for Leads Capture
            // Placeholder for Footer
          ],
        ),
      ),
    );
  }
}
