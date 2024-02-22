import type { PaymentMethod } from "./Payment"

export type OrderStatus =
  | 'paid'
  | 'created'
  | 'cancelled'
  | 'refused'
  | 'authorized'
  | 'delivered'
  | 'waiting_payment'

export type ProcessedOrder = {
  status: {
    name: string
    alias: string
  }
  number: number
  shipmentService: {
    name: string
    price: number
  }
  shippingAddress: {
    street: string
    city: string
    complement?: string
    zipcode: string
    uf: string
    number: number
    neighborhood: string
    deliveryDays: number
    deliveryDate: string
    receiver: string
  }
  products: {
    id: number
    quantity: number
    price: number
    sku: {
      id: string
      name: string
      skuCode: string
      salePrice: number
      discountPrice: number
    }
  }[]
  payment: {
    name: string
    icon: string
    pdf: string | null
    method: PaymentMethod
  }
  createdAt: string
}
