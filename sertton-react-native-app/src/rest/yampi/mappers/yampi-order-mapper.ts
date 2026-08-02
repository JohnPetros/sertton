import { type Order, OrderStatus, PaymentMethod } from "@/core/checkout/entities"
import type { YampiOrder } from "@/rest/yampi/types"
import { YampiAddressMapper } from "./yampi-address-mapper"
import { YampiOrderItemMapper } from "./yampi-order-item-mapper"
import { YampiPaymentMapper } from "./yampi-payment-mapper"

export const YampiOrderMapper = () => {
  const addressMapper = YampiAddressMapper()
  const orderItemMapper = YampiOrderItemMapper()
  const paymentMapper = YampiPaymentMapper()

  const unwrap = <Value>(value: Value | { readonly data: Value } | undefined): Value | undefined =>
    value && typeof value === "object" && "data" in value ? value.data : value

  const first = <Value>(
    value: Value | readonly Value[] | { readonly data: Value | readonly Value[] } | undefined,
  ): Value | undefined => {
    const unwrapped = unwrap<Value | readonly Value[]>(value)
    if (Array.isArray(unwrapped)) return unwrapped[0] as Value | undefined
    return unwrapped as Value | undefined
  }

  return {
    toDomain(input: YampiOrder): Order {
      const statusValue = unwrap(input.status)
      const shippingAddress = first(input.shipping_address) ?? first(input.address)
      const items = unwrap(input.items) ?? []
      const transaction = first(input.transactions)
      const status =
        {
          paid: OrderStatus.paid,
          cancelled: OrderStatus.cancelled,
          refused: OrderStatus.refused,
          authorized: OrderStatus.authorized,
          delivered: OrderStatus.delivered,
          waiting_payment: OrderStatus.waitingPayment,
        }[typeof statusValue === "string" ? statusValue : (statusValue?.alias ?? "")] ??
        OrderStatus.created
      const createdAt = new Date(
        typeof input.created_at === "string" ? input.created_at : (input.created_at?.date ?? ""),
      )

      return {
        status,
        number: String(input.number),
        shippingName: input.shipment_service ?? "",
        shippingPrice: input.value_shipment ?? 0,
        shippingAddress: shippingAddress
          ? addressMapper.toDomain(shippingAddress)
          : {
              id: "",
              receiver: "",
              zipcode: "",
              street: "",
              number: "",
              neighborhood: "",
              complement: "",
              city: "",
              uf: "",
            },
        items: items.map(orderItemMapper.toDomain),
        payment: transaction
          ? paymentMapper.toDomain(transaction)
          : { id: "", name: "N/A", icon: "", method: PaymentMethod.boleto },
        createdAt: Number.isNaN(createdAt.valueOf()) ? new Date(0) : createdAt,
      }
    },
  }
}
