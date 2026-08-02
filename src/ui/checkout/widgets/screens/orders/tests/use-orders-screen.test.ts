import { act, renderHook, waitFor } from "@testing-library/react-native"
import { OrderStatus } from "@/core/checkout/entities"
import { OrderFaker } from "@/core/checkout/entities/fakers/order-faker"
import type { CheckoutService } from "@/core/checkout/interfaces/checkout-service"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { DocumentType } from "@/core/shared/rules/document"
import { ExpoSecureStorageProvider } from "@/providers/storage/storage-providers"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

import { useOrdersScreen } from "../use-orders-screen"

jest.mock("@/ui/shared/contexts/rest-context/rest-context", () => ({
  useRestContext: jest.fn(),
}))

jest.mock("@/providers/storage/storage-providers", () => ({
  ExpoSecureStorageProvider: {
    deleteItem: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}))

const useRestContextMock = jest.mocked(useRestContext)
const secureStorageMock = jest.mocked(ExpoSecureStorageProvider)

describe("useOrdersScreen", () => {
  const checkoutServiceMock: CheckoutService = {
    fetchCheckoutLink: jest.fn(),
    fetchInstallments: jest.fn(),
    fetchOrdersByCustomer: jest.fn(),
    fetchPayments: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    secureStorageMock.getItem.mockResolvedValue(null)
    secureStorageMock.setItem.mockResolvedValue(undefined)
    secureStorageMock.deleteItem.mockResolvedValue(undefined)
    useRestContextMock.mockReturnValue({
      catalogService: {} as never,
      checkoutService: checkoutServiceMock,
      marketingService: {} as never,
    })
  })

  it("should format a document and reset it when its type changes", () => {
    const { result } = renderHook(() => useOrdersScreen())

    act(() => result.current.setDocument("123.456.789-09"))

    expect(result.current.document).toBe("12345678909")
    expect(result.current.formattedDocument).toBe("123.456.789-09")
    expect(result.current.documentType).toBe(DocumentType.cpf)
    expect(result.current.isDocumentValid).toBe(true)

    act(() => result.current.setDocumentType(DocumentType.cnpj))

    expect(result.current.document).toBe("")
    expect(result.current.isDocumentValid).toBe(false)
  })

  it("should reject an invalid document without calling the service", async () => {
    const { result } = renderHook(() => useOrdersScreen())

    act(() => result.current.setDocument("123"))
    await act(async () => result.current.fetchOrders())

    expect(checkoutServiceMock.fetchOrdersByCustomer).not.toHaveBeenCalled()
    expect(result.current.error).toContain("CPF")
    expect(result.current.isLoading).toBe(false)
  })

  it("should fetch, sort, and persist orders for a valid document", async () => {
    const olderOrder = OrderFaker.fake({
      createdAt: new Date(2026, 0, 1),
      number: "1000",
      status: OrderStatus.created,
    })
    const newerOrder = OrderFaker.fake({
      createdAt: new Date(2026, 1, 1),
      number: "2000",
      status: OrderStatus.paid,
    })
    ;(checkoutServiceMock.fetchOrdersByCustomer as jest.Mock).mockResolvedValue(
      new RestResponse({ body: [olderOrder, newerOrder] }),
    )

    const { result } = renderHook(() => useOrdersScreen())
    act(() => result.current.setDocument("123.456.789-09"))
    await act(async () => result.current.fetchOrders())

    expect(checkoutServiceMock.fetchOrdersByCustomer).toHaveBeenCalledWith("12345678909")
    expect(result.current.orders?.map((order) => order.number)).toEqual(["2000", "1000"])
    expect(result.current.isIdentified).toBe(true)
    expect(secureStorageMock.setItem).toHaveBeenCalledWith(
      "sertton.customer-document",
      "12345678909",
    )
    expect(result.current.isLoading).toBe(false)
  })

  it("should expose service failures and allow retry", async () => {
    ;(checkoutServiceMock.fetchOrdersByCustomer as jest.Mock)
      .mockResolvedValueOnce(new RestResponse({ statusCode: 500 }))
      .mockResolvedValueOnce(new RestResponse({ body: [] }))

    const { result } = renderHook(() => useOrdersScreen())
    act(() => result.current.setDocument("12345678909"))
    await act(async () => result.current.fetchOrders())
    expect(result.current.error).toContain("pedidos")

    await act(async () => result.current.fetchOrders())

    expect(result.current.orders).toEqual([])
    expect(result.current.error).toBeUndefined()
  })

  it("should load a stored document and toggle or clear the selected order", async () => {
    const order = OrderFaker.fake({ number: "2000" })
    secureStorageMock.getItem.mockResolvedValue("12345678909")
    ;(checkoutServiceMock.fetchOrdersByCustomer as jest.Mock).mockResolvedValue(
      new RestResponse({ body: [order] }),
    )

    const { result } = renderHook(() => useOrdersScreen())
    await waitFor(() => expect(result.current.orders).toEqual([order]))

    act(() => result.current.toggleOrder("2000"))
    expect(result.current.expandedOrderNumber).toBe("2000")
    act(() => result.current.toggleOrder("2000"))
    expect(result.current.expandedOrderNumber).toBeUndefined()

    await act(async () => result.current.logout())

    expect(secureStorageMock.deleteItem).toHaveBeenCalledWith("sertton.customer-document")
    expect(result.current.document).toBe("")
    expect(result.current.orders).toBeUndefined()
  })
})
