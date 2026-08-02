import type { Product } from "@/core/catalog/entities"
import { createPagination, type Pagination } from "@/core/shared/responses/pagination"
import type { YampiProduct, YampiResponse } from "@/rest/yampi/types"
import { YampiBrandMapper } from "./yampi-brand-mapper"
import { YampiSkuMapper } from "./yampi-sku-mapper"

export const YampiProductMapper = () => {
  const brandMapper = YampiBrandMapper()
  const skuMapper = YampiSkuMapper()

  const toDomain = (input: YampiProduct): Product => {
    const image = input.images.data[0]
    const imageUrl =
      image?.large?.url ?? image?.medium?.url ?? image?.thumb?.url ?? image?.small?.url ?? ""

    return {
      id: String(input.id),
      name: input.name,
      slug: input.slug,
      description: input.texts.data.description,
      specifications: input.texts.data.specifications,
      imageUrl,
      skuCode: input.sku.split(",")[0] ?? "",
      brand: brandMapper.toDomain(input.brand.data),
      skus: input.skus.data.map(skuMapper.toDomain),
    }
  }

  return {
    toDomain,
    toPagination(input: YampiResponse<YampiProduct>): Pagination<Product> {
      const pagination = input.meta?.pagination
      return createPagination({
        currentPage: pagination?.current_page ?? 1,
        items: input.data
          .map(toDomain)
          .filter((product) => product.skus.some((sku) => sku.salePrice > 0)),
        itemsPerPage: pagination?.per_page ?? input.data.length,
        totalItems: pagination?.total ?? input.data.length,
      })
    },
  }
}
