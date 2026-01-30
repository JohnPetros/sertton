import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

import 'package:sertton/ui/institutional/constants/institutional_content.dart';
import 'package:sertton/ui/institutional/widgets/components/institutional_scaffold/index.dart';
import 'package:sertton/ui/institutional/widgets/screens/about_company/about_company_presenter.dart';

class AboutCompanyScreenView extends ConsumerWidget {
  const AboutCompanyScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(aboutCompanyPresenterProvider);
    final theme = shadcn.Theme.of(context);
    const info = InstitutionalContent.companyInfo;

    return InstitutionalScaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Image.asset(
            'assets/images/sertton-logo.png',
            height: 80,
            errorBuilder: (context, error, stackTrace) =>
                const Icon(shadcn.LucideIcons.building2, size: 80),
          ),
          const SizedBox(height: 32),
          Text(
            info.name,
            style: theme.typography.h3,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          Text(
            info.description,
            style: theme.typography.p,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 40),
          Align(
            alignment: Alignment.centerLeft,
            child: Text('Contato', style: theme.typography.h4),
          ),
          const SizedBox(height: 16),
          _ContactItem(
            icon: shadcn.LucideIcons.mail,
            label: info.email,
            onTap: () => presenter.openContact('mailto:${info.email}'),
          ),
          _ContactItem(
            icon: shadcn.LucideIcons.phone,
            label: info.phone,
            onTap: () => presenter.openContact('tel:${info.phone}'),
          ),
          const SizedBox(height: 24),
          Align(
            alignment: Alignment.centerLeft,
            child: Text('Redes Sociais', style: theme.typography.h4),
          ),
          const SizedBox(height: 16),
          ...info.socialMedia.map(
            (item) => _ContactItem(
              icon: item.label.toLowerCase() == 'instagram'
                  ? shadcn.LucideIcons.instagram
                  : shadcn.LucideIcons.facebook,
              label: item.label,
              onTap: () => presenter.openContact(item.url),
            ),
          ),
        ],
      ),
    );
  }
}

class _ContactItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _ContactItem({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = shadcn.Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          children: [
            Icon(icon, size: 20, color: theme.colorScheme.primary),
            const SizedBox(width: 12),
            Text(label, style: theme.typography.p),
          ],
        ),
      ),
    );
  }
}
