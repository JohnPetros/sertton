import type { IMarketingService } from "@/core/marketing/interfaces/marketing-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = Record<never, never>

export const FetchBannersController = (service: IMarketingService) => ({
  async handle(http: Http<Schema>) {
    const response = await service.fetchBanners()
    return http.send(response)
  },
})
