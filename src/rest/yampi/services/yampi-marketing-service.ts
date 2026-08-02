import type { IMarketingService } from "@/core/marketing/interfaces/marketing-service"
import type { RestClient } from "@/core/shared/interfaces/rest-client"
import { YampiBannerMapper } from "@/rest/yampi/mappers"
import type { YampiBanner, YampiResponse } from "@/rest/yampi/types"

export const YampiMarketingService = (restClient: RestClient): IMarketingService => {
  const bannerMapper = YampiBannerMapper()

  return {
    async fetchBanners() {
      const response = await restClient.get<YampiResponse<YampiBanner>>("/marketing/banners")
      return response.mapBody((body) => body.data.map(bannerMapper.toDomain))
    },

    async saveLead(lead) {
      const response = await restClient.post<void>("/leads", {
        body: { email: lead.email, ...(lead.name ? { name: lead.name } : {}) },
      })
      return response
    },
  }
}
