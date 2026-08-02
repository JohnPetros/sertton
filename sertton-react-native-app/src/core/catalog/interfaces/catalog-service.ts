import type { Brand, Category, Collection, Product } from "@/core/catalog/entities"
import type { Pagination } from "@/core/shared/responses/pagination"
import type { RestResponse } from "@/core/shared/responses/rest-response"

export interface FetchProductsParams {
  readonly brandsIds?: readonly string[]
  readonly categoryId?: string
  readonly page?: number
  readonly query?: string
}

export interface CatalogService {
  fetchBrands(): Promise<RestResponse<readonly Brand[]>>
  fetchCategories(): Promise<RestResponse<readonly Category[]>>
  fetchCollections(): Promise<RestResponse<readonly Collection[]>>
  fetchProduct(productId: string): Promise<RestResponse<Product>>
  fetchProducts(params?: FetchProductsParams): Promise<RestResponse<Pagination<Product>>>
  fetchProductsByCollection(collectionId: string): Promise<RestResponse<readonly Product[]>>
  fetchSimilarProducts(productId: string): Promise<RestResponse<readonly Product[]>>
}

export type ICatalogService = CatalogService
