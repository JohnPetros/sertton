import { act, renderHook } from "@testing-library/react-native"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

import { useSimilarProducts } from "../use-similar-products"

jest.mock("@/ui/shared/contexts/rest-context/rest-context", () => ({
  useRestContext: jest.fn(),
}))

const useRestContextMock = jest.mocked(useRestContext)

describe("useSimilarProducts", () => {
  it("should load similar products without the current product", async () => {
    const currentProduct = ProductFaker.fake({ id: "product-1" })
    const similarProduct = ProductFaker.fake({ id: "product-2" })
    const fetchSimilarProducts = jest
      .fn()
      .mockResolvedValue(new RestResponse({ body: [currentProduct, similarProduct] }))
    useRestContextMock.mockReturnValue({
      catalogService: { fetchSimilarProducts } as never,
      checkoutService: {} as never,
      marketingService: {} as never,
    })

    const { result } = renderHook(() => useSimilarProducts("product-1"))

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(fetchSimilarProducts).toHaveBeenCalledWith("product-1")
    expect(result.current.products).toEqual([similarProduct])
    expect(result.current.isLoading).toBe(false)
  })

  it("should expose an empty list when the service fails", async () => {
    const fetchSimilarProducts = jest.fn().mockResolvedValue(new RestResponse({ statusCode: 500 }))
    useRestContextMock.mockReturnValue({
      catalogService: { fetchSimilarProducts } as never,
      checkoutService: {} as never,
      marketingService: {} as never,
    })

    const { result } = renderHook(() => useSimilarProducts("product-1"))

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(result.current.products).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })
})
