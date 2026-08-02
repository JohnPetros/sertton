import type { ICheckoutService } from "@/core/checkout/interfaces/checkout-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = Record<never, never>

export const FetchPaymentsController = (service: ICheckoutService) => ({
  async handle(http: Http<Schema>) {
    const response = await service.fetchPayments()
    return http.send(response)
  },
})
