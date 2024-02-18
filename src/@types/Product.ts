import type { Brand } from './Brand'
import type { Sku } from './Sku'

export type Product = {
  id: string
  slug: string
  skuCode: string
  name: string
  description: string
  specifications: string
  skus: Sku[]
  imageUrl: string
  brand: Brand | null
}
