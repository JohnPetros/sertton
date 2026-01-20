import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/category_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/category-filter-modal/category_filter_modal_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class CategoryFilterModalView extends ConsumerWidget {
  final List<CategoryDto> categories;
  final CategoryDto? selectedCategory;
  final void Function(CategoryDto?) onSelect;

  const CategoryFilterModalView({
    super.key,
    required this.categories,
    required this.selectedCategory,
    required this.onSelect,
  });

  void _selectAndClose(CategoryDto? category, WidgetRef ref) {
    onSelect(category);
    Navigator.of(ref.context).pop();
  }

  String _removeHtmlTags(String htmlString) {
    final RegExp exp = RegExp(r"<[^>]*>", multiLine: true, caseSensitive: true);
    return htmlString.replaceAll(exp, '');
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      categoryFilterModalPresenterProvider(selectedCategory),
    );

    return Watch((context) {
      return AlertDialog(
        title: const Text('Categorias'),
        content: ConstrainedBox(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height * 0.7,
            maxWidth: 400,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildRadioItem(
                  context,
                  label: 'Todas as categorias',
                  isSelected: presenter.isCategorySelected(null),
                  onTap: () => _selectAndClose(null, ref),
                ),
                const SizedBox(height: 8),
                ...categories.map((category) {
                  final isSelected = presenter.isCategorySelected(category);
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: _buildRadioItem(
                      context,
                      label: category.name,
                      description: _removeHtmlTags(category.description),
                      isSelected: isSelected,
                      onTap: () => _selectAndClose(category, ref),
                    ),
                  );
                }),
              ],
            ),
          ),
        ),
        actions: [
          Button.outline(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancelar'),
          ),
        ],
      );
    });
  }

  Widget _buildRadioItem(
    BuildContext context, {
    required String label,
    String? description,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isSelected
              ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.1)
              : Theme.of(context).colorScheme.background,
          border: Border.all(
            color: isSelected
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).colorScheme.border,
          ),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected
                      ? Theme.of(context).colorScheme.primary
                      : Theme.of(
                          context,
                        ).colorScheme.foreground.withValues(alpha: 0.5),
                  width: 2,
                ),
                color: isSelected
                    ? Theme.of(context).colorScheme.primary
                    : Colors.transparent,
              ),
              child: isSelected
                  ? Icon(
                      Icons.check,
                      size: 14,
                      color: Theme.of(context).colorScheme.background,
                    )
                  : null,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: TextStyle(
                      fontWeight: isSelected
                          ? FontWeight.bold
                          : FontWeight.normal,
                    ),
                  ),
                  if (description != null && description.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(
                      description,
                      style: Theme.of(context).typography.small.copyWith(
                        color: Theme.of(
                          context,
                        ).colorScheme.foreground.withValues(alpha: 0.7),
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
