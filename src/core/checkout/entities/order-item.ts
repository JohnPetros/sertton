export interface OrderItem {
  readonly id: string
  readonly price: number
  readonly quantity: number
  readonly skuCode: string
  readonly skuDiscountPrice: number
  readonly skuName: string
  readonly skuSalePrice: number
}
