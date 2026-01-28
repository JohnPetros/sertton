import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/institutional/widgets/components/institutional_scaffold/index.dart';
import 'package:sertton/ui/institutional/widgets/screens/terms_conditions/terms_conditions_presenter.dart';

class TermsConditionsScreenView extends ConsumerWidget {
  const TermsConditionsScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(termsConditionsPresenterProvider);
    final theme = shadcn.Theme.of(context);

    return InstitutionalScaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Termos e Condições', style: theme.typography.h3),
          const SizedBox(height: 24),
          Watch((context) {
            return shadcn.Accordion(
              items: presenter.sections.value.map((section) {
                return shadcn.AccordionItem(
                  trigger: shadcn.AccordionTrigger(child: Text(section.title)),
                  content: Text(section.content, style: theme.typography.p),
                );
              }).toList(),
            );
          }),
        ],
      ),
    );
  }
}
