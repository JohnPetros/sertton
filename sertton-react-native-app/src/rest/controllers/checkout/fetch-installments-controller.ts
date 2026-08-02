import type { ICheckoutService } from "@/core/checkout/interfaces/checkout-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = { query: { paymentId: string; productId: string; productPrice: number } }

export const FetchInstallmentsController = (service: ICheckoutService) => ({
  async handle(http: Http<Schema>) {
    const { paymentId, productId, productPrice } = http.getQueryParams()
    const response = await service.fetchInstallments(paymentId, productId, productPrice)
    return http.send(response)
  },
})
