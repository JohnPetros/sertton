import type { IMarketingService } from "@/core/marketing/interfaces/marketing-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = { body: { email: string; name?: string } }

export const SaveLeadController = (service: IMarketingService) => ({
  async handle(http: Http<Schema>) {
    const response = await service.saveLead(http.getBody())
    return http.send(response)
  },
})
