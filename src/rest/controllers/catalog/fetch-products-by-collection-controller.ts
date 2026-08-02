import type { ICatalogService } from "@/core/catalog/interfaces/catalog-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = { params: { collectionId: string } }

export const FetchProductsByCollectionController = (service: ICatalogService) => ({
  async handle(http: Http<Schema>) {
    const { collectionId } = http.getRouteParams()
    const response = await service.fetchProductsByCollection(collectionId)
    return http.send(response)
  },
})
