import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart' hide Scaffold;
import 'package:sertton/ui/catalog/widgets/components/installments-dialog/installments-list/installments_list_view.dart';
import '../../../../../../fakers/checkout/installment_faker.dart';

void main() {
  Widget createWidget({required Widget child}) {
    return ShadcnApp(home: Scaffold(body: child));
  }

  group('InstallmentsListView', () {
    testWidgets('should render list of installments', (tester) async {
      final installments = [
        InstallmentFaker.fakeDto(
          number: 1,
          value: 'R\$ 100,00',
          totalValue: 'R\$ 100,00',
        ),
        InstallmentFaker.fakeDto(
          number: 2,
          value: 'R\$ 50,00',
          totalValue: 'R\$ 100,00',
        ),
      ];

      await tester.pumpWidget(
        createWidget(child: InstallmentsListView(installments: installments)),
      );

      expect(find.text('1'), findsOneWidget);
      expect(find.text('2'), findsOneWidget);
      expect(find.text('R\$ 100,00'), findsNWidgets(2));
      expect(find.text('2x de R\$ 50,00'), findsOneWidget);
    });

    testWidgets('should render empty message when no installments', (
      tester,
    ) async {
      await tester.pumpWidget(
        createWidget(child: const InstallmentsListView(installments: [])),
      );

      expect(find.text('Nenhuma parcela disponível'), findsOneWidget);
    });
  });
}
