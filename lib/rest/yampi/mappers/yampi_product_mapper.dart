import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/global/responses/pagination_response.dart';
import 'package:sertton/rest/yampi/mappers/yampi_brand_mapper.dart';
import 'package:sertton/rest/yampi/mappers/yampi_sku_mapper.dart';
import 'package:sertton/rest/types/json.dart';

class YampiProductMapper {
  static ProductDto toDto(Json json) {
    if (json.containsKey('data')) {
      json = json['data'];
    }
    String imageUrl = '';
    final images = json['images'];
    if (images != null && images['data'] != null) {
      final imagesList = images['data'] as List;
      if (imagesList.isNotEmpty) {
        final firstImage = imagesList[0] as Map<String, dynamic>;
        imageUrl =
            firstImage['large']?['url'] ??
            firstImage['medium']?['url'] ??
            firstImage['thumb']?['url'] ??
            firstImage['small']?['url'] ??
            '';
      }
    }

    String description = '';
    String specifications = '';
    final texts = json['texts'];
    if (texts != null && texts['data'] != null) {
      description = texts['data']['description'] ?? '';
      specifications = texts['data']['specifications'] ?? '';
    }

    return ProductDto(
      id: json['id'].toString(),
      name: json['name'] ?? '',
      slug: json['slug'] ?? '',
      description: description,
      specifications: specifications,
      imageUrl: imageUrl,
      skuCode: '${json['sku']}'.split(',').first,
      brand: YampiBrandMapper.toDto(json['brand']['data']),
      skus: YampiSkuMapper.toDtoList(json['skus']),
    );
  }

  static List<ProductDto> toDtoList(Json json) {
    final data = (json['data'] as List).cast<Json>();
    return data.map(toDto).toList();
  }

  static PaginationResponse<ProductDto> toDtoPagination(Json json) {
    final meta = json['meta']['pagination'] as Json;
    return PaginationResponse(
      items: toDtoList(json),
      itemsPerPage: meta['per_page'],
      currentPage: meta['current_page'],
      totalItems: meta['total'],
    );
  }
}
