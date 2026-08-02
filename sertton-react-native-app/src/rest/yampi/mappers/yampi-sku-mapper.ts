import type { Sku } from "@/core/catalog/entities"
import type { YampiSku } from "@/rest/yampi/types"
import { YampiVariationMapper } from "./yampi-variation-mapper"

export const YampiSkuMapper = () => {
  const variationMapper = YampiVariationMapper()

  return {
    toDomain(input: YampiSku): Sku {
      return {
        id: String(input.id),
        skuCode: input.sku,
        costPrice: input.price_cost,
        salePrice: input.price_sale,
        discountPrice: input.price_discount,
        stock: input.total_in_stock,
        weight: input.weight,
        height: input.height,
        width: input.width,
        length: input.length,
        yampiToken: input.token,
        imageUrl: "",
        variations: input.variations.map(variationMapper.toDomain),
      }
    },
  }
}
