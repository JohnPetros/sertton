import type { Banner, Lead } from "@/core/marketing/entities"
import type { RestResponse } from "@/core/shared/responses/rest-response"

export interface MarketingService {
  fetchBanners(): Promise<RestResponse<readonly Banner[]>>
  saveLead(lead: Lead): Promise<RestResponse<void>>
}

export type IMarketingService = MarketingService
