import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:sertton/ui/catalog/widgets/screens/catalog/filters-bar/brands-filter-modal/brands_filter_modal_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

class BrandsFilterModalView extends ConsumerWidget {
  final List<BrandDto> brands;
  final List<BrandDto> selectedBrands;
  final void Function(List<BrandDto>) onConfirm;

  const BrandsFilterModalView({
    super.key,
    required this.brands,
    required this.selectedBrands,
    required this.onConfirm,
  });

  void _confirm(WidgetRef ref) {
    final presenter = ref.read(
      brandsFilterModalPresenterProvider(selectedBrands),
    );
    onConfirm(presenter.tempSelectedBrands.value);
    Navigator.of(ref.context).pop();
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(
      brandsFilterModalPresenterProvider(selectedBrands),
    );

    return Watch((context) {
      return AlertDialog(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Filtrar por Marcas'),
            if (presenter.tempSelectedBrands.value.isNotEmpty)
              Button.ghost(
                onPressed: presenter.clearSelection,
                child: const Text('Limpar'),
              ),
          ],
        ),
        content: SizedBox(
          width: 400,
          child: ListView(
            shrinkWrap: true,
            children: brands.map((brand) {
              final isSelected = presenter.isBrandSelected(brand);
              return Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Row(
                  children: [
                    Checkbox(
                      state: isSelected
                          ? CheckboxState.checked
                          : CheckboxState.unchecked,
                      onChanged: (value) => presenter.toggleBrand(brand),
                    ),
                    const SizedBox(width: 8),
                    Expanded(child: Text(brand.name)),
                  ],
                ),
              );
            }).toList(),
          ),
        ),
        actions: [
          Button.outline(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancelar'),
          ),
          Button.primary(
            onPressed: () => _confirm(ref),
            child: Text(
              presenter.tempSelectedBrands.value.isEmpty
                  ? 'Confirmar'
                  : 'Confirmar (${presenter.tempSelectedBrands.value.length})',
            ),
          ),
        ],
      );
    });
  }
}
