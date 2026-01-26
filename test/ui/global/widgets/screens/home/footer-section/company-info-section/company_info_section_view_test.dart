import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/ui/global/widgets/screens/home/footer-section/company-info-section/company_info_section_view.dart';

void main() {
  Widget createWidget() {
    return const ShadcnApp(home: Scaffold(child: CompanyInfoSectionView()));
  }

  group('CompanyInfoSectionView', () {
    testWidgets('should render company info correctly', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(
        find.text('Rua Tomatssu Iawasse 233 - Vila Nova Bonsucesso'),
        findsOneWidget,
      );
      expect(
        find.textContaining('Sertton Brasil Distribuidora Ltda'),
        findsOneWidget,
      );
      expect(find.text('CNPJ: 33.805.461/0001-90'), findsOneWidget);
    });

    testWidgets('should render current year', (tester) async {
      final currentYear = DateTime.now().year;
      await tester.pumpWidget(createWidget());

      expect(find.textContaining('© $currentYear'), findsOneWidget);
    });
  });
}
