import { act, renderHook, waitFor } from "@testing-library/react-native"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"
import { CartItemFaker } from "@/core/checkout/entities/fakers/cart-item-faker"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { ExpoLinkProvider } from "@/providers/links/expo-link-provider"
import { useCartStore } from "@/ui/checkout/stores/cart-store"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

import { useCartScreen } from "../use-cart-screen"

jest.mock("@/ui/checkout/stores/cart-store", () => ({
  useCartStore: jest.fn(),
}))

jest.mock("@/ui/shared/contexts/rest-context/rest-context", () => ({
  useRestContext: jest.fn(),
}))

jest.mock("@/providers/links/expo-link-provider", () => ({
  ExpoLinkProvider: { open: jest.fn() },
}))

const useCartStoreMock = jest.mocked(useCartStore)
const useRestContextMock = jest.mocked(useRestContext)
const openLinkMock = jest.mocked(ExpoLinkProvider.open)

describe("useCartScreen", () => {
  const clear = jest.fn()
  const hydrate = jest.fn()
  const removeItem = jest.fn()
  const setQuantity = jest.fn()
  const catalogServiceMock = { fetchProduct: jest.fn() }
  const checkoutServiceMock = { fetchCheckoutLink: jest.fn() }

  beforeEach(() => {
    jest.clearAllMocks()
    useCartStoreMock.mockReturnValue({
      clear,
      hydrate,
      isHydrated: true,
      items: [],
      removeItem,
      setQuantity,
    })
    useRestContextMock.mockReturnValue({
      catalogService: catalogServiceMock as never,
      checkoutService: checkoutServiceMock as never,
      marketingService: {} as never,
    })
  })

  it("should hydrate the cart before loading products", () => {
    useCartStoreMock.mockReturnValue({
      clear,
      hydrate,
      isHydrated: false,
      items: [],
      removeItem,
      setQuantity,
    })

    renderHook(() => useCartScreen())

    expect(hydrate).toHaveBeenCalledTimes(1)
    expect(catalogServiceMock.fetchProduct).not.toHaveBeenCalled()
  })

  it("should expose loaded items and calculate totals", async () => {
    const sku = SkuFaker.fake({
      discountPrice: 80,
      id: "sku-1",
      salePrice: 100,
      stock: 4,
      yampiToken: "token-1",
    })
    const product = ProductFaker.fake({ id: "product-1", name: "Work shirt", skus: [sku] })
    useCartStoreMock.mockReturnValue({
      clear,
      hydrate,
      isHydrated: true,
      items: [CartItemFaker.fake({ product, productId: product.id, quantity: 2, skuId: sku.id })],
      removeItem,
      setQuantity,
    })

    const { result } = renderHook(() => useCartScreen())

    await waitFor(() => expect(result.current.displayItems).toHaveLength(1))

    expect(result.current.displayItems[0]).toMatchObject({
      name: "Work shirt",
      productId: "product-1",
      quantity: 2,
      sku,
    })
    expect(result.current.totals).toEqual({ discount: 40, subtotal: 200, total: 160 })
    expect(result.current.canCheckout).toBe(true)
  })

  it("should report an error when a cart product cannot be loaded", async () => {
    const sku = SkuFaker.fake({ id: "sku-1" })
    const item = CartItemFaker.fake({ product: undefined, productId: "product-1", skuId: sku.id })
    useCartStoreMock.mockReturnValue({
      clear,
      hydrate,
      isHydrated: true,
      items: [item],
      removeItem,
      setQuantity,
    })
    catalogServiceMock.fetchProduct.mockResolvedValue(new RestResponse({ statusCode: 500 }))

    const { result } = renderHook(() => useCartScreen())

    await waitFor(() => expect(result.current.error).toContain("carregar"))

    expect(catalogServiceMock.fetchProduct).toHaveBeenCalledWith("product-1")
    expect(result.current.canCheckout).toBe(false)
  })

  it("should open the checkout link and clear the cart", async () => {
    const sku = SkuFaker.fake({ id: "sku-1", yampiToken: "token-1" })
    const product = ProductFaker.fake({ skus: [sku] })
    useCartStoreMock.mockReturnValue({
      clear,
      hydrate,
      isHydrated: true,
      items: [CartItemFaker.fake({ product, productId: product.id, quantity: 3, skuId: sku.id })],
      removeItem,
      setQuantity,
    })
    checkoutServiceMock.fetchCheckoutLink.mockResolvedValue(
      new RestResponse({ body: "https://checkout.example.com" }),
    )

    const { result } = renderHook(() => useCartScreen())
    await waitFor(() => expect(result.current.canCheckout).toBe(true))

    await act(async () => result.current.checkout())

    expect(checkoutServiceMock.fetchCheckoutLink).toHaveBeenCalledWith(["token-1"], [3])
    expect(openLinkMock).toHaveBeenCalledWith("https://checkout.example.com")
    expect(clear).toHaveBeenCalledTimes(1)
    expect(result.current.isCheckingOut).toBe(false)
  })

  it("should expose a checkout error without clearing the cart", async () => {
    const sku = SkuFaker.fake({ id: "sku-1" })
    const product = ProductFaker.fake({ skus: [sku] })
    useCartStoreMock.mockReturnValue({
      clear,
      hydrate,
      isHydrated: true,
      items: [CartItemFaker.fake({ product, productId: product.id, skuId: sku.id })],
      removeItem,
      setQuantity,
    })
    checkoutServiceMock.fetchCheckoutLink.mockResolvedValue(new RestResponse({ statusCode: 500 }))

    const { result } = renderHook(() => useCartScreen())
    await waitFor(() => expect(result.current.canCheckout).toBe(true))

    await act(async () => result.current.checkout())

    expect(result.current.error).toContain("checkout")
    expect(openLinkMock).not.toHaveBeenCalled()
    expect(clear).not.toHaveBeenCalled()
  })
})
