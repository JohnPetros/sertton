import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/router.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class App extends ConsumerWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return ShadcnApp.router(
      title: 'Sertton',
      debugShowCheckedModeBanner: false,
      routerConfig: router,
      theme: ThemeData(colorScheme: ColorSchemes.lightBlue, radius: 0.5),
      scaling: const AdaptiveScaling(1.05),
    );
  }
}
