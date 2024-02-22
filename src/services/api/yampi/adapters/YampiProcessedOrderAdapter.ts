import type { ProcessedOrder } from "@/@types/ProcessedOrder"
import type { YampiProcessedOrder } from "../types/YampiProcessedOrder"


export const YampiProcessedOrderAdapter = (yampiOrder: YampiProcessedOrder) => {
  const order: ProcessedOrder = {
    status: {
      name: yampiOrder.status.data.name,
      alias: yampiOrder.status.data.alias,
    },
    number: yampiOrder.number,
    shipmentService: {
      name: yampiOrder.shipment_service,
      price: yampiOrder.value_shipment,
    },
    shippingAddress: {
      number: Number(yampiOrder.shipping_address.data.number),
      street: yampiOrder.shipping_address.data.street,
      city: yampiOrder.shipping_address.data.city,
      complement: yampiOrder.shipping_address.data.complement,
      zipcode: yampiOrder.shipping_address.data.zip_code,
      uf: yampiOrder.shipping_address.data.uf,
      neighborhood: yampiOrder.shipping_address.data.neighborhood,
      deliveryDays: yampiOrder.days_delivery,
      deliveryDate: yampiOrder.date_delivery.date,
      receiver: yampiOrder.shipping_address.data.receiver,
    },
    payment: {
      name: yampiOrder.transactions.data[0].payment.data.name,
      icon: yampiOrder.transactions.data[0].payment.data.icon_url,
      pdf: yampiOrder.transactions.data[0].payment.data.is_billet
        ? yampiOrder.transactions.data[0].billet_url
        : null,
      method: yampiOrder.transactions.data[0].payment.data.is_billet
        ? 'ticket'
        : yampiOrder.transactions.data[0].payment.data.is_pix
          ? 'pix'
          : 'credit-card',
    },
    products: yampiOrder.items.data.map((item) => ({
      id: item.product_id,
      price: item.price,
      quantity: item.quantity,
      sku: {
        id: String(item.sku_id),
        name: item.sku.data.title,
        skuCode: item.sku.data.sku,
        salePrice: item.sku.data.price_sale,
        discountPrice: item.sku.data.price_discount,
      },
    })),
    createdAt: yampiOrder.created_at.date,
  }

  return order
}
