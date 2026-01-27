import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' as shadcn;

import 'package:sertton/constants/routes.dart';
import 'package:sertton/constants/sertton_contacts.dart';
import 'package:sertton/ui/global/widgets/layout/drawer/drawer_menu_header/index.dart';
import 'package:sertton/ui/global/widgets/layout/drawer/drawer_link_item/index.dart';
import 'package:sertton/ui/global/widgets/layout/drawer/drawer_menu_presenter.dart';

class DrawerMenuView extends ConsumerWidget {
  const DrawerMenuView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.read(drawerMenuPresenterProvider);
    final theme = shadcn.Theme.of(context);

    return Drawer(
      backgroundColor: theme.colorScheme.background,
      width: MediaQuery.of(context).size.width * 0.85,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const DrawerMenuHeader(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _buildSectionTitle('FALE CONOSCO', theme),
                  DrawerLinkItem(
                    icon: FontAwesomeIcons.whatsapp,
                    title: SerttonContacts.whatsappLabel,
                    onTap: () {
                      Navigator.pop(context);
                      presenter.openUrl(
                        SerttonContacts.whatsappUrl,
                        fallbackUrl: SerttonContacts.whatsappHttpsUrl,
                      );
                    },
                  ),
                  DrawerLinkItem(
                    icon: FontAwesomeIcons.phone,
                    title: SerttonContacts.landlineLabel,
                    onTap: () {
                      Navigator.pop(context);
                      presenter.openUrl(SerttonContacts.landlineUrl);
                    },
                  ),
                  DrawerLinkItem(
                    icon: FontAwesomeIcons.envelope,
                    title: SerttonContacts.emailAddress,
                    onTap: () {
                      Navigator.pop(context);
                      presenter.openUrl(SerttonContacts.emailUrl);
                    },
                  ),
                  const SizedBox(height: 24),
                  const shadcn.Divider(),
                  const SizedBox(height: 24),
                  _buildSectionTitle('INSTITUCIONAL', theme),
                  DrawerLinkItem(
                    icon: FontAwesomeIcons.lock,
                    title: 'Políticas de privacidade',
                    onTap: () {
                      Navigator.pop(context);
                      presenter.navigateTo(Routes.privacyPolicy);
                    },
                  ),
                  DrawerLinkItem(
                    icon: FontAwesomeIcons.fileLines,
                    title: 'Termos e condições',
                    onTap: () {
                      Navigator.pop(context);
                      presenter.navigateTo(Routes.termsOfUse);
                    },
                  ),
                  DrawerLinkItem(
                    icon: FontAwesomeIcons.circleInfo,
                    title: 'Sobre a Sertton Industrial',
                    onTap: () {
                      Navigator.pop(context);
                      presenter.navigateTo(Routes.about);
                    },
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: Text(
              'Versão 1.0.0',
              style: TextStyle(
                fontSize: 12,
                color: theme.colorScheme.mutedForeground,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title, shadcn.ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.only(left: 16, bottom: 8, top: 16),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: theme.colorScheme.mutedForeground,
        ),
      ),
    );
  }
}
