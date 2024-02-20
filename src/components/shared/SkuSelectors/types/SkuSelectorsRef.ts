import type { Sku } from '@/@types/Sku'

export type SkuSelectorsRef = {
  selectedSku: Sku | null
  onAddSkuToCart: () => boolean
}
