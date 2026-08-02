import type { YampiRelation } from "./yampi-relation"
import type { YampiSku } from "./yampi-sku"

export interface YampiOrderItem {
  readonly id: number
  readonly quantity: number
  readonly price: number
  readonly item_sku: string
  readonly sku?: YampiRelation<YampiSku> | YampiSku
  readonly sku_name?: string
  readonly sku_code?: string
  readonly price_sale?: number
  readonly price_discount?: number
}
