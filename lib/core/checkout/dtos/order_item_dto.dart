class OrderItemDto {
  final String id;
  final int quantity;
  final double price;
  final String skuName;
  final String skuCode;
  final double skuSalePrice;
  final double skuDiscountPrice;

  OrderItemDto({
    required this.id,
    required this.quantity,
    required this.price,
    required this.skuName,
    required this.skuCode,
    required this.skuSalePrice,
    required this.skuDiscountPrice,
  });
}
