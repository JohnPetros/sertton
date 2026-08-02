import { AxiosRestClient } from "@/rest/axios/axios-rest-client"
import { YampiCatalogService } from "@/rest/yampi/services/yampi-catalog-service"
import { YampiCheckoutService } from "@/rest/yampi/services/yampi-checkout-service"
import { YampiMarketingService } from "@/rest/yampi/services/yampi-marketing-service"

const requiredEnvironment = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required server environment variable: ${name}`)
  return value
}
const restClient = () =>
  AxiosRestClient({
    baseUrl: requiredEnvironment("YAMPI_API_URL"),
    headers: {
      "User-Secret-Key": requiredEnvironment("YAMPI_SECRET_KEY"),
      "User-Token": requiredEnvironment("YAMPI_USER_TOKEN"),
    },
  })
export const createYampiCatalogService = () => YampiCatalogService(restClient())
export const createYampiCheckoutService = () =>
  YampiCheckoutService({
    restClient: restClient(),
    purchaseUrl: requiredEnvironment("YAMPI_PURCHASE_URL"),
  })
export const createYampiMarketingService = () => YampiMarketingService(restClient())
