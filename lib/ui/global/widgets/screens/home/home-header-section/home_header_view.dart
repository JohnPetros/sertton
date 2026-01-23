import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/index.dart';

class HomeHeaderView extends ConsumerWidget {
  final Function(String)? onSubmitted;

  const HomeHeaderView({super.key, this.onSubmitted});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton.ghost(icon: const Icon(Icons.menu), onPressed: () {}),
            Image.asset(
              'assets/images/sertton-logo.png',
              height: 40,
              fit: BoxFit.contain,
            ),
          ],
        ),
        const SizedBox(height: 16),
        const Text(
          'PROCURAR PRODUTO',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: Colors.gray,
          ),
        ),
        const SizedBox(height: 8),
        AppSearchBar(onSubmitted: onSubmitted),
      ],
    );
  }
}
