import type { ICatalogService } from "@/core/catalog/interfaces/catalog-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = Record<never, never>

export const FetchCollectionsController = (service: ICatalogService) => ({
  async handle(http: Http<Schema>) {
    const response = await service.fetchCollections()
    return http.send(response)
  },
})
