import type { ICheckoutService } from "@/core/checkout/interfaces/checkout-service"
import type { Http } from "@/core/shared/interfaces/http"

type Schema = { query: { customerDocument: string } }

export const FetchOrdersByCustomerController = (service: ICheckoutService) => ({
  async handle(http: Http<Schema>) {
    const { customerDocument } = http.getQueryParams()
    const response = await service.fetchOrdersByCustomer(customerDocument)
    return http.send(response)
  },
})
