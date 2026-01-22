class CartItemDto {
  final String productId;
  final String skuId;
  final int quantity;

  CartItemDto({
    required this.productId,
    required this.skuId,
    required this.quantity,
  });

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CartItemDto &&
          runtimeType == other.runtimeType &&
          productId == other.productId &&
          skuId == other.skuId &&
          quantity == other.quantity;

  @override
  int get hashCode => productId.hashCode ^ skuId.hashCode ^ quantity.hashCode;
}
