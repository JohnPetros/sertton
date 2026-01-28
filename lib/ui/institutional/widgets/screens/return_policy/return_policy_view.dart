import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/institutional/widgets/components/institutional_scaffold/index.dart';
import 'package:sertton/ui/institutional/widgets/screens/return_policy/return_policy_presenter.dart';

class ReturnPolicyScreenView extends ConsumerWidget {
  const ReturnPolicyScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(returnPolicyPresenterProvider);
    final theme = shadcn.Theme.of(context);

    return InstitutionalScaffold(
      body: Watch((context) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ...presenter.sections.value.map((section) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (section.title.isNotEmpty) ...[
                    Text(section.title, style: theme.typography.h3),
                    const SizedBox(height: 16),
                  ],
                  Text(section.content, style: theme.typography.p),
                  const SizedBox(height: 24),
                ],
              );
            }),
          ],
        );
      }),
    );
  }
}
