import type { Brand, Category, Collection, Product } from "@/core/catalog/entities"
import type {
  FetchProductsParams,
  ICatalogService,
} from "@/core/catalog/interfaces/catalog-service"
import type { Pagination } from "@/core/shared/responses/pagination"
import { ExpoApiClient, withQuery } from "@/rest/expo/services/expo-api-client"
export const ExpoCatalogService = (): ICatalogService => ({
  async fetchBrands() {
    return ExpoApiClient<readonly Brand[]>("/api/catalog/brands")
  },
  async fetchCategories() {
    return ExpoApiClient<readonly Category[]>("/api/catalog/categories")
  },
  async fetchCollections() {
    return ExpoApiClient<readonly Collection[]>("/api/catalog/collections")
  },
  async fetchProduct(productId) {
    return ExpoApiClient<Product>(`/api/catalog/products/${encodeURIComponent(productId)}`)
  },
  async fetchProducts(params: FetchProductsParams = {}) {
    return ExpoApiClient<Pagination<Product>>(
      withQuery("/api/catalog/products", {
        page: params.page,
        categoryId: params.categoryId,
        query: params.query,
        brandsIds: params.brandsIds,
      }),
    )
  },
  async fetchProductsByCollection(collectionId) {
    return ExpoApiClient<readonly Product[]>(
      `/api/catalog/collections/${encodeURIComponent(collectionId)}/products`,
    )
  },
  async fetchSimilarProducts(productId) {
    return ExpoApiClient<readonly Product[]>(
      `/api/catalog/products/${encodeURIComponent(productId)}/similar`,
    )
  },
})
