import type { ICheckoutService } from "@/core/checkout/interfaces/checkout-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = { body: { quantities: readonly number[]; skuTokens: readonly string[] } }

export const FetchCheckoutLinkController = (service: ICheckoutService) => ({
  async handle(http: Http<Schema>) {
    const { quantities, skuTokens } = http.getBody()
    const response = await service.fetchCheckoutLink(skuTokens, quantities)
    return http.send(response)
  },
})
