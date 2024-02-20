import { YampiSku } from '../types/YampiSku'
import { YampiImageAdapter } from './YampiImageAdapter'

import { YampiVariationAdapter } from './YampiVariationAdapter'

import type { Sku } from '@/@types/Sku'

export const YampiSkuAdapter = (yampiSku: YampiSku) => {
  const imageUrl = yampiSku.images ? YampiImageAdapter(yampiSku.images.data[0]) : ''
  const variations =
    yampiSku.variations.length > 0 ? yampiSku.variations.map(YampiVariationAdapter) : []

  const sku: Sku = {
    id: String(yampiSku.id),
    skuCode: yampiSku.sku,
    costPrice: yampiSku.price_cost,
    salePrice: yampiSku.price_sale,
    discountPrice: yampiSku.price_discount,
    weight: yampiSku.weight,
    height: yampiSku.height,
    width: yampiSku.width,
    length: yampiSku.length,
    stock: yampiSku.total_in_stock,
    yampiToken: yampiSku.token,
    imageUrl,
    variations,
  }

  return sku
}
