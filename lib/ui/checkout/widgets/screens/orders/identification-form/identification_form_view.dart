import 'package:flutter/material.dart' as m;
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders_screen_presenter.dart';

class IdentificationFormView extends StatefulWidget {
  final String document;
  final DocumentType documentType;
  final bool isLoading;
  final bool isValid;
  final Function(String) onDocumentChanged;
  final Function(DocumentType) onDocumentTypeChanged;
  final VoidCallback onSubmit;

  const IdentificationFormView({
    super.key,
    required this.document,
    required this.documentType,
    required this.isLoading,
    required this.isValid,
    required this.onDocumentChanged,
    required this.onDocumentTypeChanged,
    required this.onSubmit,
  });

  @override
  State<IdentificationFormView> createState() => _IdentificationFormViewState();
}

class _IdentificationFormViewState extends State<IdentificationFormView> {
  late final MaskTextInputFormatter _cpfFormatter;
  late final MaskTextInputFormatter _cnpjFormatter;

  @override
  void initState() {
    super.initState();
    _cpfFormatter = MaskTextInputFormatter(
      mask: '###.###.###-##',
      filter: {"#": RegExp(r'[0-9]')},
      initialText: widget.documentType == DocumentType.cpf
          ? widget.document
          : "",
    );
    _cnpjFormatter = MaskTextInputFormatter(
      mask: '##.###.###/####-##',
      filter: {"#": RegExp(r'[0-9]')},
      initialText: widget.documentType == DocumentType.cnpj
          ? widget.document
          : "",
    );
  }

  @override
  void didUpdateWidget(covariant IdentificationFormView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.documentType != oldWidget.documentType) {
      if (widget.documentType == DocumentType.cpf) {
        _cpfFormatter.clear();
      } else {
        _cnpjFormatter.clear();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final formatter = widget.documentType == DocumentType.cpf
        ? _cpfFormatter
        : _cnpjFormatter;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Meus Pedidos',
            style: theme.typography.h3.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            'Para consultar seus pedidos, informe seu documento abaixo.',
            style: theme.typography.small.copyWith(
              color: theme.colorScheme.mutedForeground,
            ),
          ),
          const SizedBox(height: 32),

          Row(
            children: [
              _buildTypeOption(context, 'Pessoa Física', DocumentType.cpf),
              const SizedBox(width: 12),
              _buildTypeOption(context, 'Pessoa Jurídica', DocumentType.cnpj),
            ],
          ),

          const SizedBox(height: 24),

          TextField(
            key: ValueKey(widget.documentType),
            initialValue: widget.documentType == DocumentType.cpf
                ? _cpfFormatter.maskText(widget.document)
                : _cnpjFormatter.maskText(widget.document),
            onChanged: widget.onDocumentChanged,
            keyboardType: TextInputType.number,
            inputFormatters: [formatter],
            placeholder: Text(
              widget.documentType == DocumentType.cpf
                  ? '000.000.000-00'
                  : '00.000.000/0000-00',
            ),
          ),

          const SizedBox(height: 32),

          PrimaryButton(
            onPressed: (widget.isValid && !widget.isLoading)
                ? widget.onSubmit
                : null,
            child: widget.isLoading
                ? const m.CircularProgressIndicator()
                : const Text('BUSCAR PEDIDOS'),
          ),
        ],
      ),
    );
  }

  Widget _buildTypeOption(
    BuildContext context,
    String label,
    DocumentType type,
  ) {
    final theme = Theme.of(context);
    final isSelected = widget.documentType == type;

    return Expanded(
      child: GestureDetector(
        onTap: () => widget.onDocumentTypeChanged(type),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected
                ? theme.colorScheme.primary
                : theme.colorScheme.background,
            border: Border.all(
              color: isSelected
                  ? theme.colorScheme.primary
                  : theme.colorScheme.border,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: theme.typography.small.copyWith(
              color: isSelected
                  ? theme.colorScheme.primaryForeground
                  : theme.colorScheme.foreground,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ),
      ),
    );
  }
}
