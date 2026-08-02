import type { ICatalogService } from "@/core/catalog/interfaces/catalog-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = Record<never, never>

export const FetchBrandsController = (service: ICatalogService) => ({
  async handle(http: Http<Schema>) {
    const response = await service.fetchBrands()
    return http.send(response)
  },
})
