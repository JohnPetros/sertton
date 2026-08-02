import { act, renderHook } from "@testing-library/react-native"
import { router } from "expo-router"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { useCatalogStore } from "@/ui/catalog/stores/catalog-store"
import { useCartStore } from "@/ui/checkout/stores/cart-store"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

import { useProductScreen } from "../use-product-screen"

jest.mock("expo-router", () => ({
  router: { back: jest.fn() },
}))

const mockCatalogState = {
  selectedProduct: undefined as ReturnType<typeof ProductFaker.fake> | undefined,
}
const mockCartState = {
  addItem: jest.fn(),
  items: [] as readonly { skuId: string; quantity: number }[],
  removeItem: jest.fn(),
}

jest.mock("@/ui/catalog/stores/catalog-store", () => ({
  useCatalogStore: jest.fn((selector: (state: typeof mockCatalogState) => unknown) =>
    selector(mockCatalogState),
  ),
}))

jest.mock("@/ui/checkout/stores/cart-store", () => ({
  useCartStore: jest.fn((selector: (state: typeof mockCartState) => unknown) =>
    selector(mockCartState),
  ),
}))

jest.mock("@/ui/shared/contexts/rest-context/rest-context", () => ({
  useRestContext: jest.fn(),
}))

const routerBackMock = jest.mocked(router.back)
const useCatalogStoreMock = jest.mocked(useCatalogStore)
const useCartStoreMock = jest.mocked(useCartStore)
const useRestContextMock = jest.mocked(useRestContext)

describe("useProductScreen", () => {
  const product = ProductFaker.fake({
    id: "product-1",
    name: "Canvas bag",
    skus: [
      {
        ...SkuFaker.fake(),
        id: "sku-1",
        imageUrl: "https://example.com/sku.png",
        salePrice: 100,
        discountPrice: 80,
        stock: 3,
      },
    ],
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockCatalogState.selectedProduct = undefined
    mockCartState.items = []
    useCatalogStoreMock.mockImplementation((selector) => selector(mockCatalogState as never))
    useCartStoreMock.mockImplementation((selector) => selector(mockCartState as never))
  })

  it("should load the product and add the selected SKU to the cart", async () => {
    const fetchProduct = jest.fn().mockResolvedValue(new RestResponse({ body: product }))
    useRestContextMock.mockReturnValue({
      catalogService: { fetchProduct } as never,
      checkoutService: {} as never,
      marketingService: {} as never,
    })
    const { result } = renderHook(() => useProductScreen("product-1"))

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })
    act(() => result.current.changeQuantity(99))
    act(() => result.current.addToCart())

    expect(fetchProduct).toHaveBeenCalledWith("product-1")
    expect(result.current.product).toEqual(product)
    expect(result.current.quantity).toBe(3)
    expect(result.current.canAddToCart).toBe(true)
    expect(mockCartState.addItem).toHaveBeenCalledWith({
      product,
      productId: "product-1",
      quantity: 3,
      skuId: "sku-1",
    })
  })

  it("should not fetch a cached product and should clamp quantity at one", () => {
    mockCatalogState.selectedProduct = product
    const fetchProduct = jest.fn()
    useRestContextMock.mockReturnValue({
      catalogService: { fetchProduct } as never,
      checkoutService: {} as never,
      marketingService: {} as never,
    })
    const { result } = renderHook(() => useProductScreen("product-1"))

    act(() => result.current.changeQuantity(0))
    act(() => result.current.goBack())

    expect(fetchProduct).not.toHaveBeenCalled()
    expect(result.current.quantity).toBe(1)
    expect(routerBackMock).toHaveBeenCalledTimes(1)
  })

  it("should expose a product loading error and disable add to cart", async () => {
    const fetchProduct = jest.fn().mockResolvedValue(new RestResponse({ statusCode: 500 }))
    useRestContextMock.mockReturnValue({
      catalogService: { fetchProduct } as never,
      checkoutService: {} as never,
      marketingService: {} as never,
    })
    const { result } = renderHook(() => useProductScreen("product-1"))

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(result.current.error).toBe("Não foi possível carregar este produto.")
    expect(result.current.product).toBeUndefined()
    expect(result.current.canAddToCart).toBe(false)
  })
})
