import { Address } from "./Address"

export type OrderStatus =
  | 'paid'
  | 'created'
  | 'cancelled'
  | 'refused'
  | 'authorized'
  | 'delivered'
  | 'waiting_payment'

export type Order = {
  status: OrderStatus
  number: number
  customerId: number
  productsValue: number
  shipmentValue: number
  discountValue: number
  totalValue: number
  shipmentServiceName: string
  deliveryDays: number
  address: Address
  installments: number
  customer: {
    id: string
    name: string
    document: string
  }
  products: {
    id: number
    skuId: number
    quantity: number
    price: number
  }[]
}
