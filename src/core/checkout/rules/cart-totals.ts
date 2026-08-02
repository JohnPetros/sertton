export interface CartTotalItem {
  readonly discountPrice: number
  readonly quantity: number
  readonly salePrice: number
}

export interface CartTotals {
  readonly discount: number
  readonly subtotal: number
  readonly total: number
}

export const calculateDiscount = (salePrice: number, discountPrice: number): number =>
  Math.max(0, salePrice - discountPrice)

export const calculateCartTotals = (items: readonly CartTotalItem[]): CartTotals => {
  const subtotal = items.reduce((total, item) => total + item.salePrice * item.quantity, 0)
  const discount = items.reduce(
    (total, item) => total + calculateDiscount(item.salePrice, item.discountPrice) * item.quantity,
    0,
  )

  return { discount, subtotal, total: subtotal - discount }
}
