import type { OrderItem } from "@/core/checkout/entities"
import type { YampiOrderItem } from "@/rest/yampi/types"

export const YampiOrderItemMapper = () => ({
  toDomain(input: YampiOrderItem): OrderItem {
    const sku = input.sku && "data" in input.sku ? input.sku.data : input.sku

    return {
      id: String(input.id),
      quantity: input.quantity,
      price: input.price,
      skuName: sku?.title ?? input.sku_name ?? input.item_sku,
      skuCode: sku?.sku ?? input.sku_code ?? input.item_sku,
      skuSalePrice: sku?.price_sale ?? input.price_sale ?? input.price,
      skuDiscountPrice: sku?.price_discount ?? input.price_discount ?? input.price,
    }
  },
})
