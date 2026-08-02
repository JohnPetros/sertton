import type { Address } from "@/core/checkout/entities/address"
import type { OrderItem } from "@/core/checkout/entities/order-item"
import type { Payment } from "@/core/checkout/entities/payment"

export enum OrderStatus {
  authorized = "authorized",
  cancelled = "cancelled",
  created = "created",
  delivered = "delivered",
  paid = "paid",
  refused = "refused",
  waitingPayment = "waitingPayment",
}

export interface Order {
  readonly createdAt: Date
  readonly items: readonly OrderItem[]
  readonly number: string
  readonly payment: Payment
  readonly shippingAddress: Address
  readonly shippingName: string
  readonly shippingPrice: number
  readonly status: OrderStatus
}
