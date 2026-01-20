import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/brand_dto.dart';
import 'package:signals/signals.dart';

class BrandsFilterModalPresenter {
  final List<BrandDto> initialSelectedBrands;

  final tempSelectedBrands = signal<List<BrandDto>>([]);

  BrandsFilterModalPresenter({required this.initialSelectedBrands}) {
    tempSelectedBrands.value = List.from(initialSelectedBrands);
  }

  void toggleBrand(BrandDto brand) {
    final current = List<BrandDto>.from(tempSelectedBrands.value);
    if (current.any((currentBrand) => currentBrand.id == brand.id)) {
      current.removeWhere((currentBrand) => currentBrand.id == brand.id);
    } else {
      current.add(brand);
    }
    tempSelectedBrands.value = current;
  }

  void clearSelection() {
    tempSelectedBrands.value = [];
  }

  bool isBrandSelected(BrandDto brand) {
    return tempSelectedBrands.value.any(
      (currentBrand) => currentBrand.id == brand.id,
    );
  }
}

final brandsFilterModalPresenterProvider = Provider.autoDispose
    .family<BrandsFilterModalPresenter, List<BrandDto>>((ref, selectedBrands) {
      return BrandsFilterModalPresenter(initialSelectedBrands: selectedBrands);
    });
