import 'package:sertton/core/checkout/dtos/installment_dto.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class InstallmentsListView extends StatelessWidget {
  final List<InstallmentDto> installments;

  const InstallmentsListView({super.key, required this.installments});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (installments.isEmpty) {
      return Center(
        child: Text(
          'Nenhuma parcela disponível',
          style: theme.typography.small.copyWith(
            color: theme.colorScheme.mutedForeground,
          ),
        ),
      );
    }

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 12, right: 16),
          child: Row(
            children: [
              SizedBox(
                width: 40,
                child: Text(
                  'Nº',
                  style: theme.typography.small.copyWith(
                    color: theme.colorScheme.mutedForeground,
                  ),
                ),
              ),
              Expanded(
                child: Text(
                  'Valor da parcela',
                  style: theme.typography.small.copyWith(
                    color: theme.colorScheme.mutedForeground,
                  ),
                ),
              ),
              Text(
                'Total do produto',
                style: theme.typography.small.copyWith(
                  color: theme.colorScheme.mutedForeground,
                ),
              ),
            ],
          ),
        ),
        const Divider(),
        Expanded(
          child: ListView.separated(
            itemCount: installments.length,
            separatorBuilder: (context, index) => const Divider(),
            itemBuilder: (context, index) {
              final item = installments[index];
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 12),
                child: Row(
                  children: [
                    SizedBox(
                      width: 40,
                      child: Text(
                        '${item.number}',
                        style: theme.typography.small.copyWith(
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Text(item.text, style: theme.typography.small),
                    ),
                    Text(
                      item.totalValue,
                      style: theme.typography.small.copyWith(
                        color: theme.colorScheme.mutedForeground,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
