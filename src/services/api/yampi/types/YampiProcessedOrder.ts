import { YampiAddress } from './YampiAddress'

export type YampiProcessedOrder = {
  delivered: boolean
  value_products: number
  number: number
  id: number
  pix: {
    data: unknown[]
  }
  shipment_service: string
  transactions: {
    data: {
      marketplace_id: unknown
      cancelled_at: unknown
      metadata: {
        data: unknown[]
      }
      billet_barcode: string
      billet_url: string
      installments: number
      authorized: boolean
      payment: {
        data: {
          icon_url: string
          active_config: boolean
          is_pix: boolean
          is_credit_card: boolean
          is_pix_in_installments: boolean
          is_billet: boolean
          name: string
          alias: string
          id: number
          has_config: boolean
          is_deposit: boolean
          is_wallet: boolean
        }
      }
      id: number
      buyer_installment_formated: string
      bank_alias: unknown
      error_message: unknown
      billet_document_number: unknown
      installment_value: number
      cancelled: boolean
      total_logs: number
      billet_our_number: unknown
      status: string
      installment_formated: string
      billet_whatsapp_link: string
      billet_date: {
        date: string
        timezone: string
        timezone_type: number
      }
    }[]
  }
  value_discount: number
  items: {
    data: {
      gift: boolean
      price_cost: number
      quantity: number
      item_sku: string
      has_recomm: number
      is_digital: boolean
      sku_id: number
      shipment_cost: number
      bundle_name: unknown
      gift_value: number
      price: number
      product_id: number
      bundle_id: unknown
      id: number
      sku: {
        data: {
          price_cost: number
          days_availability_formated: string
          created_at: {
            date: string
            timezone: string
            timezone_type: number
          }
          availability: number
          title: string
          updated_at: {
            date: string
            timezone: string
            timezone_type: number
          }
          variations: {
            name: string
            id: number
            value_id: number
            value: string
          }[]
          product_id: number
          allow_sell_without_customization: boolean
          id: number
          sku: string
          barcode: unknown
          seller_id: unknown
          height: number
          order: number
          price_discount: number
          erp_id: unknown
          length: number
          purchase_url: string
          blocked_sale: boolean
          weight: number
          total_orders: unknown
          quantity_managed: boolean
          token: string
          combinations: string
          price_sale: number
          width: number
          customizations: {
            data: unknown[]
          }
        }
      }
      customizations: unknown[]
    }[]
  }
  status: {
    data: {
      name: string
      alias: string
      description: string
      id: number
    }
  }
  whatsapp: {
    data: {
      billet: {
        link: string
        message: string
      }
      order_shipped: unknown
      abandoned_cart: unknown
      pix: unknown
    }
  }
  payments: {
    icon_url: string
    name: string
    alias: string
  }[]
  created_at: {
    date: string
    timezone: string
    timezone_type: number
  }
  days_delivery: number
  value_shipment: number
  shipping_address: {
    data: YampiAddress
  }
  shipment_icon_url: string
  value_total: number
  date_delivery: {
    date: string
    timezone: string
    timezone_type: number
  }
}
