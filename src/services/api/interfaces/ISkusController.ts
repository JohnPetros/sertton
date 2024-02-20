import type { Sku } from '@/@types/Sku'

export interface ISkusController {
  getSkusByProductId(productId: string): Promise<Sku[]>
}
