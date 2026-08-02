import type { Brand } from "@/core/catalog/entities/brand"
import type { Sku } from "@/core/catalog/entities/sku"

export interface Product {
  readonly brand: Brand
  readonly description: string
  readonly id: string
  readonly imageUrl: string
  readonly name: string
  readonly skuCode: string
  readonly skus: readonly Sku[]
  readonly slug: string
  readonly specifications: string
}
