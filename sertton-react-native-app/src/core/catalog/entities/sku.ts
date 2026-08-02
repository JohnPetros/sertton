import type { Variation } from "@/core/catalog/entities/variation"

export interface Sku {
  readonly costPrice: number
  readonly discountPrice: number
  readonly height: number
  readonly id: string
  readonly imageUrl: string
  readonly length: number
  readonly salePrice: number
  readonly skuCode: string
  readonly stock: number
  readonly yampiToken: string
  readonly variations: readonly Variation[]
  readonly weight: number
  readonly width: number
}
