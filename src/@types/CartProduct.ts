import type { Product } from "./Product"

export type CartProduct = Product & {
  quantity: number
  selectedSkuId: string
}
