import { act, renderHook } from "@testing-library/react-native"
import { router } from "expo-router"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"
import { useCatalogStore } from "@/ui/catalog/stores/catalog-store"

import { useProductCard } from "../use-product-card"

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}))

jest.mock("@/ui/catalog/stores/catalog-store", () => ({
  useCatalogStore: jest.fn((selector: (state: object) => unknown) =>
    selector({ setSelectedProduct: jest.fn() }),
  ),
}))

const routerPushMock = jest.mocked(router.push)
const useCatalogStoreMock = jest.mocked(useCatalogStore)

describe("useProductCard", () => {
  const product = ProductFaker.fake({
    id: "product-1",
    skus: [SkuFaker.fake({ id: "sku-1" })],
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should expose the first SKU and navigate after selecting a product", () => {
    const setSelectedProduct = jest.fn()
    useCatalogStoreMock.mockImplementation((selector) => selector({ setSelectedProduct } as never))
    const { result } = renderHook(() => useProductCard(product))

    act(() => result.current.openProduct())

    expect(result.current.sku).toBe(product.skus[0])
    expect(setSelectedProduct).toHaveBeenCalledWith(product)
    expect(routerPushMock).toHaveBeenCalledWith("/(main)/(tabs)/catalog/product-1")
  })

  it("should toggle the cart dialog state", () => {
    const { result } = renderHook(() => useProductCard(product))

    expect(result.current.isCartDialogOpen).toBe(false)
    act(() => result.current.openCartDialog())
    expect(result.current.isCartDialogOpen).toBe(true)
    act(() => result.current.closeCartDialog())
    expect(result.current.isCartDialogOpen).toBe(false)
  })
})
