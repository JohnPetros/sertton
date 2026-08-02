import type { YampiBrand } from "./yampi-brand"
import type { YampiImage } from "./yampi-image"
import type { YampiRelation } from "./yampi-relation"
import type { YampiSku } from "./yampi-sku"

export interface YampiProduct {
  readonly id: number
  readonly name: string
  readonly slug: string
  readonly sku: string
  readonly brand: YampiRelation<YampiBrand>
  readonly texts: YampiRelation<{ readonly description: string; readonly specifications: string }>
  readonly images: YampiRelation<readonly YampiImage[]>
  readonly skus: YampiRelation<readonly YampiSku[]>
}
