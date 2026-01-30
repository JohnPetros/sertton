import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter/material.dart'
    show
        showModalBottomSheet,
        Colors,
        Divider,
        Spacer,
        Icons,
        GestureDetector,
        Navigator,
        ClipRRect,
        BorderRadius,
        BoxFit,
        Icon;
import 'package:sertton/core/checkout/dtos/payment_dto.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart'
    hide Colors, Divider, Navigator;

class BrandSelectorView extends StatelessWidget {
  final List<PaymentDto> payments;
  final String? selectedId;
  final ValueChanged<String> onSelect;

  const BrandSelectorView({
    super.key,
    required this.payments,
    required this.selectedId,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    if (payments.isEmpty) return const SizedBox.shrink();

    final selectedPayment = payments.firstWhere(
      (p) => p.id == selectedId,
      orElse: () => payments.first,
    );

    return Button.outline(
      onPressed: () {
        showModalBottomSheet(
          context: context,
          backgroundColor: Colors.transparent,
          builder: (context) {
            final theme = Theme.of(context);
            return Container(
              decoration: BoxDecoration(
                color: theme.colorScheme.background,
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(24),
                ),
              ),
              padding: const EdgeInsets.symmetric(vertical: 24),
              child: ListView.separated(
                shrinkWrap: true,
                separatorBuilder: (context, index) => const Divider(),
                itemCount: payments.length,
                itemBuilder: (context, index) {
                  final p = payments[index];
                  return GestureDetector(
                    onTap: () {
                      onSelect(p.id);
                      Navigator.of(context).pop();
                    },
                    child: Container(
                      color: Colors.transparent,
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: SvgPicture.network(
                              p.icon,
                              height: 24,
                              width: 32,
                              fit: BoxFit.contain,
                              placeholderBuilder: (context) =>
                                  const Icon(Icons.credit_card, size: 24),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Text(p.name, style: theme.typography.base),
                          const Spacer(),
                          if (p.id == selectedId)
                            Icon(
                              Icons.check,
                              size: 16,
                              color: theme.colorScheme.primary,
                            ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            );
          },
        );
      },
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: SvgPicture.network(
                  selectedPayment.icon,
                  height: 24,
                  width: 32,
                  fit: BoxFit.contain,
                  placeholderBuilder: (context) =>
                      const Icon(Icons.credit_card, size: 24),
                ),
              ),
              const SizedBox(width: 12),
              Text(selectedPayment.name),
            ],
          ),
          const Icon(Icons.keyboard_arrow_down, size: 16),
        ],
      ),
    );
  }
}
