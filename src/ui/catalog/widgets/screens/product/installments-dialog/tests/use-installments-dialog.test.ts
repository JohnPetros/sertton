import { act, renderHook } from "@testing-library/react-native"

import { InstallmentFaker } from "@/core/checkout/entities/fakers/installment-faker"
import { PaymentFaker } from "@/core/checkout/entities/fakers/payment-faker"
import type { CheckoutService } from "@/core/checkout/interfaces/checkout-service"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

import { useInstallmentsDialog } from "../use-installments-dialog"

jest.mock("@/ui/shared/contexts/rest-context/rest-context", () => ({
  useRestContext: jest.fn(),
}))

const useRestContextMock = jest.mocked(useRestContext)

describe("useInstallmentsDialog", () => {
  const payment = PaymentFaker.fake({ id: "payment-1", name: "Credit card", icon: "" })
  const secondPayment = PaymentFaker.fake({ id: "payment-2", name: "Pix", icon: "" })
  const installments = InstallmentFaker.fakeMany(2, { number: 2 })
  let checkoutServiceMock: CheckoutService

  beforeEach(() => {
    jest.clearAllMocks()
    checkoutServiceMock = {
      fetchCheckoutLink: jest.fn(),
      fetchInstallments: jest.fn().mockResolvedValue(new RestResponse({ body: installments })),
      fetchOrdersByCustomer: jest.fn(),
      fetchPayments: jest
        .fn()
        .mockResolvedValue(new RestResponse({ body: [payment, secondPayment] })),
    }
    useRestContextMock.mockReturnValue({
      catalogService: {} as never,
      checkoutService: checkoutServiceMock,
      marketingService: {} as never,
    })
  })

  it("should load payments and installments when opened", async () => {
    const { result } = renderHook(() =>
      useInstallmentsDialog({ isOpen: true, productId: "product-1", productPrice: 120 }),
    )

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(checkoutServiceMock.fetchPayments).toHaveBeenCalledTimes(1)
    expect(checkoutServiceMock.fetchInstallments).toHaveBeenCalledWith(
      "payment-1",
      "product-1",
      120,
    )
    expect(result.current.selectedPayment).toEqual(payment)
    expect(result.current.installments).toEqual(installments)
    expect(result.current.isLoading).toBe(false)
  })

  it("should toggle the payment selector and load a selected payment", async () => {
    const selectedInstallments = InstallmentFaker.fakeMany(1)
    checkoutServiceMock.fetchInstallments = jest
      .fn()
      .mockResolvedValue(new RestResponse({ body: installments }))
    const { result } = renderHook(() =>
      useInstallmentsDialog({ isOpen: true, productId: "product-1", productPrice: 120 }),
    )

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    act(() => result.current.togglePaymentSelector())
    expect(result.current.isPaymentSelectorOpen).toBe(true)

    checkoutServiceMock.fetchInstallments = jest
      .fn()
      .mockResolvedValue(new RestResponse({ body: selectedInstallments }))
    await act(async () => {
      result.current.selectPayment(secondPayment.id)
      await Promise.resolve()
    })

    expect(result.current.selectedPayment).toEqual(secondPayment)
    expect(result.current.isPaymentSelectorOpen).toBe(false)
    expect(checkoutServiceMock.fetchInstallments).toHaveBeenCalledWith(
      "payment-2",
      "product-1",
      120,
    )
  })

  it("should expose a payment loading error", async () => {
    checkoutServiceMock.fetchPayments = jest
      .fn()
      .mockResolvedValue(new RestResponse({ statusCode: 500 }))
    const { result } = renderHook(() =>
      useInstallmentsDialog({ isOpen: true, productId: "product-1", productPrice: 120 }),
    )

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(result.current.error).toBe("Não foi possível carregar as formas de pagamento.")
    expect(result.current.isLoading).toBe(false)
  })
})
