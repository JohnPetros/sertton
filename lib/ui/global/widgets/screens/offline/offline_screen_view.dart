import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals_flutter/signals_flutter.dart';

import 'package:sertton/ui/global/widgets/screens/offline/offline_screen_presenter.dart';

class OfflineScreenView extends ConsumerWidget {
  const OfflineScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(offlineScreenPresenterProvider);
    final theme = Theme.of(context);

    return Scaffold(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                LucideIcons.wifiOff,
                size: 80,
                color: theme.colorScheme.mutedForeground,
              ),
              const SizedBox(height: 24),
              Text(
                'Sem conexão com a internet!',
                textAlign: TextAlign.center,
                style: theme.typography.h3.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Verifique sua conexão para seguir navegando.',
                textAlign: TextAlign.center,
                style: theme.typography.base.copyWith(
                  color: theme.colorScheme.mutedForeground,
                ),
              ),
              const SizedBox(height: 32),
              Watch((context) {
                final isLoading = presenter.isChecking.value;

                return PrimaryButton(
                  onPressed: isLoading ? null : presenter.tryReconnect,
                  child: isLoading
                      ? const SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Tentar novamente'),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}
