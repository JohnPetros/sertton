import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/index.dart';

class AppHeaderView extends ConsumerWidget {
  final Function(String)? onSubmitted;
  final ValueChanged<String>? onChanged;
  final String? initialValue;
  final bool autoFocus;

  const AppHeaderView({
    super.key,
    this.onSubmitted,
    this.onChanged,
    this.initialValue,
    this.autoFocus = false,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
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
          Text(
            'PROCURAR PRODUTO',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.mutedForeground,
            ),
          ),
          const SizedBox(height: 8),
          AppSearchBar(
            onSubmitted: onSubmitted,
            onChanged: onChanged,
            initialValue: initialValue,
            autoFocus: autoFocus,
          ),
        ],
      ),
    );
  }
}
