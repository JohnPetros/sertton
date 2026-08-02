import type { Installment, Order, Payment } from "@/core/checkout/entities"
import type { RestResponse } from "@/core/shared/responses/rest-response"

export interface CheckoutService {
  fetchCheckoutLink(
    skuTokens: readonly string[],
    quantities: readonly number[],
  ): Promise<RestResponse<string>>
  fetchInstallments(
    paymentId: string,
    productId: string,
    productPrice: number,
  ): Promise<RestResponse<readonly Installment[]>>
  fetchOrdersByCustomer(customerDocument: string): Promise<RestResponse<readonly Order[]>>
  fetchPayments(): Promise<RestResponse<readonly Payment[]>>
}

export type ICheckoutService = CheckoutService
