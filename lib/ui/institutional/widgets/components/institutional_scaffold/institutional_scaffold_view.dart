import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

import 'package:sertton/ui/institutional/widgets/components/institutional_scaffold/institutional_scaffold_presenter.dart';

class InstitutionalScaffoldView extends ConsumerWidget {
  final Widget body;

  const InstitutionalScaffoldView({super.key, required this.body});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(institutionalScaffoldPresenterProvider);

    return shadcn.Scaffold(
      headers: [
        shadcn.AppBar(
          leading: [
            shadcn.IconButton.ghost(
              onPressed: () => presenter.onBack(),
              icon: const Icon(shadcn.LucideIcons.chevronLeft),
            ),
          ],
        ),
      ],
      child: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: body,
        ),
      ),
    );
  }
}
