import 'package:sertton/core/catalog/dtos/product_dto.dart';

class CollectionDto {
  final String id;
  final String name;
  final List<ProductDto> products;

  CollectionDto({required this.id, required this.name, required this.products});
}
