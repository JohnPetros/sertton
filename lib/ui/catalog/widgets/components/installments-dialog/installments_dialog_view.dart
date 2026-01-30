import 'package:flutter/material.dart'
    show
        Dialog,
        Colors,
        Border,
        BorderRadius,
        MainAxisSize,
        CrossAxisAlignment,
        MainAxisAlignment,
        MediaQuery;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/catalog/widgets/components/installments-dialog/brand-selector/index.dart';
import 'package:sertton/ui/catalog/widgets/components/installments-dialog/installments-list/index.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart'
    hide Colors, Border, BorderRadius;
import 'package:signals/signals_flutter.dart';

import 'installments_presenter.dart';

class InstallmentsDialogView extends ConsumerWidget {
  final String productId;
  final double productPrice;

  const InstallmentsDialogView({
    super.key,
    required this.productId,
    required this.productPrice,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      installmentsPresenterProvider((
        productId: productId,
        productPrice: productPrice,
      )),
    );

    final theme = Theme.of(context);
    final screenSize = MediaQuery.of(context).size;

    return Watch((context) {
      return Dialog(
        backgroundColor: Colors.transparent,
        insetPadding: const EdgeInsets.symmetric(horizontal: 0),
        child: Container(
          width: screenSize.width * 0.9,
          constraints: BoxConstraints(
            maxHeight: screenSize.height * 0.8,
            maxWidth: screenSize.width * 0.9,
            minWidth: screenSize.width * 0.9,
          ),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: theme.colorScheme.background,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: theme.colorScheme.border),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Parcelamento',
                    style: theme.typography.h4.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  IconButton.ghost(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              if (presenter.isLoading.value &&
                  presenter.payments.value.isEmpty) ...[
                const Center(
                  child: Padding(
                    padding: EdgeInsets.all(32),
                    child: CircularProgressIndicator(),
                  ),
                ),
              ] else if (presenter.error.value != null &&
                  presenter.payments.value.isEmpty) ...[
                Center(
                  child: Column(
                    children: [
                      Text(
                        presenter.error.value!,
                        style: theme.typography.small.copyWith(
                          color: theme.colorScheme.mutedForeground,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Button.outline(
                        onPressed: presenter.loadPayments,
                        child: const Text('Tentar novamente'),
                      ),
                    ],
                  ),
                ),
              ] else ...[
                Text(
                  'BANDEIRA',
                  style: theme.typography.small.copyWith(
                    color: theme.colorScheme.mutedForeground,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 8),
                BrandSelector(
                  payments: presenter.payments.value,
                  selectedId: presenter.selectedPaymentId.value,
                  onSelect: presenter.selectPayment,
                ),
                const SizedBox(height: 24),
                Text(
                  'Valores para 1 unidade do produto',
                  style: theme.typography.small.copyWith(
                    color: theme.colorScheme.mutedForeground,
                  ),
                ),
                const SizedBox(height: 16),
                Expanded(
                  child:
                      presenter.isLoading.value &&
                          presenter.installments.value.isEmpty
                      ? const Center(child: CircularProgressIndicator())
                      : InstallmentsList(
                          installments: presenter.installments.value,
                        ),
                ),
              ],
            ],
          ),
        ),
      );
    });
  }
}
