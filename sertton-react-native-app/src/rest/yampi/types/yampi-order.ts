import type { YampiAddress } from "./yampi-address"
import type { YampiOrderItem } from "./yampi-order-item"
import type { YampiPayment } from "./yampi-payment"
import type { YampiRelation } from "./yampi-relation"

export interface YampiOrder {
  readonly number: number
  readonly shipment_service?: string
  readonly value_shipment?: number
  readonly shipping_address?: YampiRelation<YampiAddress> | YampiAddress
  readonly address?: readonly YampiAddress[] | YampiRelation<readonly YampiAddress[]>
  readonly items?: YampiRelation<readonly YampiOrderItem[]> | readonly YampiOrderItem[]
  readonly transactions?:
    | YampiRelation<readonly YampiPayment[]>
    | YampiRelation<YampiPayment>
    | readonly YampiPayment[]
    | YampiPayment
  readonly created_at?: { readonly date?: string } | string
  readonly status?:
    | YampiRelation<{ readonly alias?: string }>
    | { readonly alias?: string }
    | string
}
