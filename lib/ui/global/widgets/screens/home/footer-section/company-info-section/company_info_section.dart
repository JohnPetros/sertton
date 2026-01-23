import 'package:shadcn_flutter/shadcn_flutter.dart';

class CompanyInfoSection extends StatelessWidget {
  const CompanyInfoSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final currentYear = DateTime.now().year;
    const textStyle = TextStyle(fontSize: 12, color: Colors.gray, height: 1.5);

    return Column(
      children: [
        const Text(
          'Rua Tomatssu Iawasse 233 - Vila Nova Bonsucesso',
          style: textStyle,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          '© $currentYear Sertton Brasil Distribuidora Ltda',
          style: textStyle.copyWith(
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.foreground,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 4),
        const Text(
          'CNPJ: 33.805.461/0001-90',
          style: textStyle,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
