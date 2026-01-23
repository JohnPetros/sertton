import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/index.dart';

class AppHeaderView extends ConsumerWidget {
  final Function(String)? onSubmitted;
  final ValueChanged<String>? onChanged;

  const AppHeaderView({super.key, this.onSubmitted, this.onChanged});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
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
          AppSearchBar(onSubmitted: onSubmitted, onChanged: onChanged),
        ],
      ),
    );
  }
}
