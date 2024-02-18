import { Product } from '@/@types/Product'
import type { YampiProduct } from '../types/YampiProduct'

import { YampiBrandAdapter } from './YampiBrandAdapter'
import { YampiImageAdapter } from './YampiImageAdapter'
import { YampiSkuAdapter } from './YampiSkuAdapter'

export const YampiProductAdapter = (yampiProduct: YampiProduct) => {
  const imageUrl = yampiProduct.images
    ? YampiImageAdapter(yampiProduct.images.data[0])
    : ''
  const skus = yampiProduct.skus ? yampiProduct.skus.data.map(YampiSkuAdapter) : []
  const brand = yampiProduct.brand ? YampiBrandAdapter(yampiProduct.brand.data) : null
  const description = yampiProduct.texts ? yampiProduct.texts.data.description : ''
  const specifications = yampiProduct.texts ? yampiProduct.texts.data.specifications : ''

  const product: Product = {
    id: String(yampiProduct.id),
    skuCode: String(yampiProduct.sku).split(',')[0],
    name: yampiProduct.name,
    slug: yampiProduct.slug,
    description,
    specifications,
    brand,
    skus,
    imageUrl: imageUrl,
  }

  return product
}
