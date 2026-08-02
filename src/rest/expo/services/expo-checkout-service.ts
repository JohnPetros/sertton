import type { Installment, Order, Payment } from "@/core/checkout/entities"
import type { ICheckoutService } from "@/core/checkout/interfaces/checkout-service"
import { ExpoApiClient, withQuery } from "@/rest/expo/services/expo-api-client"

type SerializedOrder = Omit<Order, "createdAt"> & {
  readonly createdAt: string
}

export const ExpoCheckoutService = (): ICheckoutService => ({
  async fetchCheckoutLink(skuTokens, quantities) {
    return ExpoApiClient<string>("/api/checkout/link", {
      body: JSON.stringify({ quantities, skuTokens }),
      method: "POST",
    })
  },
  async fetchInstallments(paymentId, productId, productPrice) {
    return ExpoApiClient<readonly Installment[]>(
      withQuery("/api/checkout/installments", { paymentId, productId, productPrice }),
    )
  },
  async fetchOrdersByCustomer(customerDocument) {
    const response = await ExpoApiClient<readonly SerializedOrder[]>(
      withQuery("/api/orders", { customerDocument }),
      {},
    )
    return response.mapBody((orders) =>
      orders.map((order) => ({ ...order, createdAt: new Date(order.createdAt) })),
    )
  },
  async fetchPayments() {
    return ExpoApiClient<readonly Payment[]>("/api/checkout/payments")
  },
})
