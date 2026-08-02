import type { Banner, Lead } from "@/core/marketing/entities"
import type { IMarketingService } from "@/core/marketing/interfaces/marketing-service"
import { ExpoApiClient } from "@/rest/expo/services/expo-api-client"
export const ExpoMarketingService = (): IMarketingService => ({
  async fetchBanners() {
    return ExpoApiClient<readonly Banner[]>("/api/marketing/banners")
  },
  async saveLead(lead: Lead) {
    return ExpoApiClient<void>("/api/leads", { body: JSON.stringify(lead), method: "POST" })
  },
})
