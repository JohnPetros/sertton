import type { ICheckoutService } from "@/core/checkout/interfaces/checkout-service"
import { ValidationError } from "@/core/shared/errors/app-error"
import type { RestClient } from "@/core/shared/interfaces/rest-client"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { YampiInstallmentMapper, YampiOrderMapper, YampiPaymentMapper } from "@/rest/yampi/mappers"
import type {
  YampiInstallmentsResponse,
  YampiOrder,
  YampiPayment,
  YampiResponse,
} from "@/rest/yampi/types"

export interface YampiCheckoutDependencies {
  readonly purchaseUrl: string
  readonly restClient: RestClient
}

export const YampiCheckoutService = ({
  purchaseUrl,
  restClient,
}: YampiCheckoutDependencies): ICheckoutService => {
  const installmentMapper = YampiInstallmentMapper()
  const orderMapper = YampiOrderMapper()
  const paymentMapper = YampiPaymentMapper()

  return {
    async fetchCheckoutLink(skuTokens, quantities) {
      if (
        skuTokens.length === 0 ||
        quantities.length === 0 ||
        skuTokens.length !== quantities.length
      )
        throw new ValidationError("Invalid checkout items")
      return new RestResponse({
        body: `${purchaseUrl.replace(/\/$/, "")}/${skuTokens.map((token, index) => `${token}:${quantities[index]}`).join(",")}`,
      })
    },

    async fetchInstallments(paymentId, productId, productPrice) {
      void paymentId
      restClient.clearQueryParams()
      restClient.setQueryParam("amount", productPrice)
      const response = await restClient.get<YampiInstallmentsResponse>(
        `/public/catalog/products/${productId}/installments`,
      )
      return response.mapBody((body) => body.installments.map(installmentMapper.toDomain))
    },

    async fetchOrdersByCustomer(customerDocument) {
      const response = await restClient.get<YampiResponse<YampiOrder>>("/orders", {
        query: {
          customer_document: customerDocument,
          include: "items,shipping_address,status,transactions",
        },
      })
      return response.mapBody((body) => body.data.map(orderMapper.toDomain))
    },

    async fetchPayments() {
      const response = await restClient.get<YampiResponse<YampiPayment>>("/checkout/payments")
      return response.mapBody((body) => body.data.map(paymentMapper.toDomain))
    },
  }
}
