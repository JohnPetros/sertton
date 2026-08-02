import type { YampiVariation } from "./yampi-variation"

export interface YampiSku {
  readonly id: number
  readonly sku: string
  readonly title?: string
  readonly token: string
  readonly price_cost: number
  readonly price_sale: number
  readonly price_discount: number
  readonly total_in_stock: number
  readonly weight: number
  readonly height: number
  readonly width: number
  readonly length: number
  readonly variations: readonly YampiVariation[]
}
