class CartItemDto {
  final String productSlug;
  final String skuId;
  final int quantity;

  CartItemDto({
    required this.productSlug,
    required this.skuId,
    required this.quantity,
  });
}
