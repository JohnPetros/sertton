class CartItemDto {
  final String productSlug;
  final String skuId;
  final String name;
  final String imageUrl;
  final String variationValue;
  final double salePrice;
  final double discountPrice;
  final int quantity;

  CartItemDto({
    required this.productSlug,
    required this.skuId,
    required this.name,
    required this.imageUrl,
    required this.variationValue,
    required this.salePrice,
    required this.discountPrice,
    required this.quantity,
  });

  Map<String, dynamic> toMap() {
    return {
      'productSlug': productSlug,
      'skuId': skuId,
      'name': name,
      'imageUrl': imageUrl,
      'variationValue': variationValue,
      'salePrice': salePrice,
      'discountPrice': discountPrice,
      'quantity': quantity,
    };
  }

  factory CartItemDto.fromMap(Map<String, dynamic> map) {
    return CartItemDto(
      productSlug: map['productSlug'] ?? '',
      skuId: map['skuId'] ?? '',
      name: map['name'] ?? '',
      imageUrl: map['imageUrl'] ?? '',
      variationValue: map['variationValue'] ?? '',
      salePrice: (map['salePrice'] ?? 0.0).toDouble(),
      discountPrice: (map['discountPrice'] ?? 0.0).toDouble(),
      quantity: map['quantity'] ?? 0,
    );
  }

  CartItemDto copyWith({
    String? productSlug,
    String? skuId,
    String? name,
    String? imageUrl,
    String? variationValue,
    double? salePrice,
    double? discountPrice,
    int? quantity,
  }) {
    return CartItemDto(
      productSlug: productSlug ?? this.productSlug,
      skuId: skuId ?? this.skuId,
      name: name ?? this.name,
      imageUrl: imageUrl ?? this.imageUrl,
      variationValue: variationValue ?? this.variationValue,
      salePrice: salePrice ?? this.salePrice,
      discountPrice: discountPrice ?? this.discountPrice,
      quantity: quantity ?? this.quantity,
    );
  }
}
