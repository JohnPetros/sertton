import type { Variation } from './Variation'

export type Sku = {
  id: string
  skuCode: string
  costPrice: number
  salePrice: number
  discountPrice: number
  weight: number
  height: number
  width: number
  length: number
  imageUrl: string
  variations: Variation[]
  stock: number
  yampiToken: string
}
