import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/core/checkout/dtos/address_dto.dart';

class OrderAddressSectionView extends StatelessWidget {
  final AddressDto address;

  const OrderAddressSectionView({super.key, required this.address});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'ENDEREÇO DE ENTREGA',
          style: theme.typography.small.copyWith(
            color: theme.colorScheme.mutedForeground,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Text(
          address.receiver,
          style: theme.typography.base.copyWith(fontWeight: FontWeight.w500),
        ),
        Text(
          '${address.street}, ${address.number}, ${address.neighborhood}',
          style: theme.typography.base,
        ),
        Text('${address.city} / ${address.uf}', style: theme.typography.base),
        Text('CEP: ${address.zipcode}', style: theme.typography.base),
      ],
    );
  }
}
