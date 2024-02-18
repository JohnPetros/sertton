import type { YampiBrand } from './YampiBrand'
import type { YampiImage } from './YampiImage'
import type { YampiSku } from './YampiSku'

export type YampiProduct = {
  relevance: number | null
  id: number
  merchant_id: number
  seller_id: number | null
  affiliation_id: number
  active: boolean
  gift_value: string
  searchable: boolean
  simple: boolean
  erp_id: number | null
  ncm: number | null
  has_variations: boolean
  is_digital: boolean
  warranty: number
  custom_shipping: boolean
  shipping_price: string
  name: string
  slug: string
  sku: string
  rating: number
  priority: number
  url: string
  redirect_url_card: string | null
  redirect_url_billet: string | null
  preview_url: string
  brand?: {
    data: YampiBrand
  }
  images?: {
    data: YampiImage[]
  }
  skus?: {
    data: YampiSku[]
  }
  texts?: {
    data: {
      description: string
      specifications: string
    }
  }
}
