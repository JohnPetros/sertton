import { act, renderHook, waitFor } from "@testing-library/react-native"
import { router } from "expo-router"
import { type Mock, mock } from "ts-jest-mocker"
import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import type { CatalogService } from "@/core/catalog/interfaces/catalog-service"
import { PaymentMethod } from "@/core/checkout/entities"
import type { CheckoutService } from "@/core/checkout/interfaces/checkout-service"
import type { MarketingService } from "@/core/marketing/interfaces/marketing-service"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

import { useHomeScreen } from "../use-home-screen"

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}))

jest.mock("@/ui/shared/contexts/rest-context/rest-context", () => ({
  useRestContext: jest.fn(),
}))

const routerMock = jest.mocked(router)
const useRestContextMock = jest.mocked(useRestContext)

const responseAfterTick = <Body,>(response: RestResponse<Body>) =>
  new Promise<RestResponse<Body>>((resolve) => setTimeout(() => resolve(response), 0))

const pendingResponse = <Body,>() => new Promise<RestResponse<Body>>(() => {})

describe("useHomeScreen", () => {
  let catalogService: Mock<CatalogService>
  let checkoutService: Mock<CheckoutService>
  let marketingService: Mock<MarketingService>

  const collection = { id: "collection-1", name: "Destaques" }
  const product = ProductFaker.fake({
    brand: { id: "brand-1", name: "Sertton" },
    name: "Arramate",
    skuCode: "SKU-1",
    skus: [],
  })

  beforeEach(() => {
    jest.clearAllMocks()
    catalogService = mock<CatalogService>()
    checkoutService = mock<CheckoutService>()
    marketingService = mock<MarketingService>()
    useRestContextMock.mockReturnValue({ catalogService, checkoutService, marketingService })

    marketingService.fetchBanners.mockImplementation(() => pendingResponse())
    catalogService.fetchCollections.mockImplementation(() => pendingResponse())
    checkoutService.fetchPayments.mockImplementation(() => pendingResponse())
  })

  it("should load banners, collections, payments and collection products", async () => {
    const banner = { id: "banner-1", imageUrl: "https://example.com/banner.png" }
    const payment = {
      icon: "https://example.com/pix.svg",
      id: "pix",
      method: PaymentMethod.pix,
      name: "Pix",
    }

    marketingService.fetchBanners.mockImplementation(() =>
      responseAfterTick(new RestResponse({ body: [banner] })),
    )
    catalogService.fetchCollections.mockImplementation(() =>
      responseAfterTick(new RestResponse({ body: [collection] })),
    )
    catalogService.fetchProductsByCollection.mockImplementation(() =>
      responseAfterTick(new RestResponse({ body: [product] })),
    )
    checkoutService.fetchPayments.mockImplementation(() =>
      responseAfterTick(new RestResponse({ body: [payment] })),
    )

    const { result } = renderHook(() => useHomeScreen())

    await waitFor(() =>
      expect(result.current.collections).toEqual([{ collection, products: [product] }]),
    )

    expect(result.current.banners).toEqual([banner])
    expect(result.current.payments).toEqual([payment])
    expect(catalogService.fetchProductsByCollection).toHaveBeenCalledWith(collection.id)
  })

  it("should expose an error when banners or collections fail", async () => {
    marketingService.fetchBanners.mockImplementation(() =>
      responseAfterTick(new RestResponse({ statusCode: 500 })),
    )
    catalogService.fetchCollections.mockImplementation(() =>
      responseAfterTick(new RestResponse({ body: [] })),
    )
    checkoutService.fetchPayments.mockImplementation(() =>
      responseAfterTick(new RestResponse({ body: [] })),
    )

    const { result } = renderHook(() => useHomeScreen())

    await waitFor(() =>
      expect(result.current.error).toBe("Não foi possível carregar o conteúdo da loja."),
    )
  })

  it("should reject an invalid newsletter email without calling the service", async () => {
    const { result } = renderHook(() => useHomeScreen())

    await act(async () => {
      result.current.setEmail("invalid-email")
      await result.current.subscribe()
    })

    expect(result.current.message).toBe("Informe um e-mail válido.")
    expect(marketingService.saveLead).not.toHaveBeenCalled()
  })

  it("should save a valid newsletter email and expose the success message", async () => {
    marketingService.saveLead.mockResolvedValue(new RestResponse({ body: undefined }))
    const { result } = renderHook(() => useHomeScreen())

    act(() => result.current.setEmail("cliente@example.com"))
    await act(async () => result.current.subscribe())

    expect(marketingService.saveLead).toHaveBeenCalledWith({ email: "cliente@example.com" })
    expect(result.current.message).toBe("Cadastro realizado com sucesso!")
    expect(result.current.isSubmitting).toBe(false)
  })

  it("should navigate to the catalog when searching with a non-empty query", () => {
    const { result } = renderHook(() => useHomeScreen())

    act(() => result.current.onSearch("  arramate  "))

    expect(routerMock.push).toHaveBeenCalledWith({
      pathname: "/(main)/(tabs)/catalog",
      params: { query: "  arramate  " },
    })
  })
})
