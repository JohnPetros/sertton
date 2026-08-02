import type { ICatalogService } from "@/core/catalog/interfaces/catalog-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = {
  query: { brandsIds?: readonly string[]; categoryId?: string; page?: number; query?: string }
}

export const FetchProductsController = (service: ICatalogService) => ({
  async handle(http: Http<Schema>) {
    const response = await service.fetchProducts(http.getQueryParams())
    return http.send(response)
  },
})
