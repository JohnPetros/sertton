import type { YampiImage } from './YampiImage'
import type { YampiVariation } from './YampiVariation'

type CreatedUpdatedAt = {
  date: string
  timezone_type: number
  timezone: string
}

type Customizations = {
  data: unknown[]
}

export type YampiSku = {
  id: number
  images?: { data: [YampiImage] }
  variations: YampiVariation[]
  product_id: number
  seller_id: number | null
  sku: string
  token: string
  erp_id: number | null
  blocked_sale: boolean
  barcode: string | null
  title: string
  availability: number
  availability_soldout: number
  days_availability_formated: string
  price_cost: number
  price_sale: number
  price_discount: number
  width: number
  height: number
  length: number
  weight: number
  quantity_managed: boolean
  combinations: string
  order: number
  total_in_stock: number
  total_orders: number | null
  allow_sell_without_customization: boolean
  image_reference_sku_id: number | null
  purchase_url: string
  created_at: CreatedUpdatedAt
  updated_at: CreatedUpdatedAt
  customizations: Customizations
}
