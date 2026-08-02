import type { ICatalogService } from "@/core/catalog/interfaces/catalog-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = { params: { productId: string } }

export const FetchProductController = (service: ICatalogService) => ({
  async handle(http: Http<Schema>) {
    const { productId } = http.getRouteParams()
    const response = await service.fetchProduct(productId)
    return http.send(response)
  },
})
