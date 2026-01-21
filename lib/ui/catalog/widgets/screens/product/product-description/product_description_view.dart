import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/product/product-description/product_description_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class ProductDescriptionView extends ConsumerWidget {
  final ProductDto product;

  const ProductDescriptionView({super.key, required this.product});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(productDescriptionPresenterProvider(product));
    final theme = Theme.of(context);

    return Watch((context) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildSection(
            context: context,
            title: 'Descrição do produto',
            content: presenter.description.value,
            theme: theme,
          ),
          const SizedBox(height: 32),
          _buildSection(
            context: context,
            title: 'Especificações técnicas',
            content: presenter.specifications.value,
            theme: theme,
            isSpecs: true,
          ),
        ],
      );
    });
  }

  Widget _buildSection({
    required BuildContext context,
    required String title,
    required String content,
    required ThemeData theme,
    bool isSpecs = false,
  }) {
    if (content.isEmpty) return const SizedBox.shrink();

    return Column(
      children: [
        Center(
          child: Text(
            title,
            style: theme.typography.h3.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.foreground,
            ),
          ),
        ),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Text(
            // Cleaning up common HTML tags for better text display if no HTML renderer is used
            _formatContent(content),
            textAlign: isSpecs ? TextAlign.start : TextAlign.justify,
            style: theme.typography.base.copyWith(
              color: theme.colorScheme.mutedForeground,
              height: 1.6,
            ),
          ),
        ),
      ],
    );
  }

  String _formatContent(String content) {
    // Simple HTML to Text conversion for common tags
    return content
        .replaceAll(RegExp(r'<br\s*/?>'), '\n')
        .replaceAll(RegExp(r'<p>'), '')
        .replaceAll(RegExp(r'</p>'), '\n\n')
        .replaceAll(RegExp(r'<li>'), '• ')
        .replaceAll(RegExp(r'</li>'), '\n')
        .replaceAll(RegExp(r'<[^>]*>|&nbsp;'), ' ')
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
        .replaceAll(RegExp(r'\n{3,}'), '\n\n')
        .trim();
  }
}
