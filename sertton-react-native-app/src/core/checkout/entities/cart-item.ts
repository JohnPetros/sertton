import type { Product } from "@/core/catalog/entities/product"

export interface CartItem {
  readonly productId: string
  readonly product?: Product
  readonly quantity: number
  readonly skuId: string
}
