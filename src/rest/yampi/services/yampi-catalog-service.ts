import type {
  FetchProductsParams,
  ICatalogService,
} from "@/core/catalog/interfaces/catalog-service"
import type { RestClient } from "@/core/shared/interfaces/rest-client"
import {
  YampiBrandMapper,
  YampiCategoryMapper,
  YampiCollectionMapper,
  YampiProductMapper,
} from "@/rest/yampi/mappers"
import type {
  YampiBrand,
  YampiCategory,
  YampiCollection,
  YampiProduct,
  YampiProductResponse,
  YampiResponse,
} from "@/rest/yampi/types"

export const YampiCatalogService = (restClient: RestClient): ICatalogService => {
  const brandMapper = YampiBrandMapper()
  const categoryMapper = YampiCategoryMapper()
  const collectionMapper = YampiCollectionMapper()
  const productMapper = YampiProductMapper()

  return {
    async fetchBrands() {
      const response = await restClient.get<YampiResponse<YampiBrand>>("/catalog/brands")
      return response.mapBody((body) => body.data.map(brandMapper.toDomain))
    },

    async fetchCategories() {
      const response = await restClient.get<YampiResponse<YampiCategory>>("/catalog/categories")
      return response.mapBody((body) => body.data.map(categoryMapper.toDomain))
    },

    async fetchCollections() {
      const response = await restClient.get<YampiResponse<YampiCollection>>("/catalog/collections")
      return response.mapBody((body) => body.data.map(collectionMapper.toDomain))
    },

    async fetchProduct(productId) {
      restClient.clearQueryParams()
      restClient.setQueryParam("include", "skus,brand,images,texts")
      const response = await restClient.get<YampiProductResponse>(`/catalog/products/${productId}`)
      return response.mapBody((body) => productMapper.toDomain(body.data))
    },

    async fetchProducts(params: FetchProductsParams = {}) {
      restClient.clearQueryParams()
      restClient.setQueryParam("include", "skus,brand,images,texts")
      restClient.setQueryParam("page", params.page ?? 1)
      restClient.setQueryParam("category_id[]", params.categoryId)
      restClient.setQueryParam("q", params.query)
      params.brandsIds?.forEach((id, index) => {
        restClient.setQueryParam(`brand_id[${index}]`, id)
      })

      const response = await restClient.get<YampiResponse<YampiProduct>>("/catalog/products")
      return response.mapBody(productMapper.toPagination)
    },

    async fetchProductsByCollection(collectionId) {
      restClient.setQueryParam("include", "skus,brand,images,texts")
      const response = await restClient.get<YampiResponse<YampiProduct>>(
        `/catalog/collections/${collectionId}/products`,
      )
      return response.mapBody((body) => productMapper.toPagination(body).items)
    },

    async fetchSimilarProducts(productId) {
      restClient.setQueryParam("include", "skus,brand,images,texts")
      const response = await restClient.get<YampiResponse<YampiProduct>>(
        `/catalog/products/${productId}/similars`,
      )
      return response.mapBody((body) => productMapper.toPagination(body).items)
    },
  }
}
