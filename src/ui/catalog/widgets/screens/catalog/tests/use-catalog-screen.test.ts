import { act, renderHook } from "@testing-library/react-native"
import { useLocalSearchParams } from "expo-router"

import { BrandFaker } from "@/core/catalog/entities/fakers/brand-faker"
import { CategoryFaker } from "@/core/catalog/entities/fakers/category-faker"
import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { createPagination } from "@/core/shared/responses/pagination"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

import { useCatalogScreen } from "../use-catalog-screen"

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}))

jest.mock("@/ui/shared/contexts/rest-context/rest-context", () => ({
  useRestContext: jest.fn(),
}))

const useLocalSearchParamsMock = jest.mocked(useLocalSearchParams)
const useRestContextMock = jest.mocked(useRestContext)

describe("useCatalogScreen", () => {
  const firstProduct = ProductFaker.fake({ id: "product-1", name: "First product" })
  const secondProduct = ProductFaker.fake({ id: "product-2", name: "Second product" })
  const brand = BrandFaker.fake({ id: "brand-1", name: "Sertton" })
  const category = CategoryFaker.fake({ id: "category-1", name: "Bags" })
  let fetchProducts: jest.Mock
  let fetchBrands: jest.Mock
  let fetchCategories: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    useLocalSearchParamsMock.mockReturnValue({ query: "bags" })
    fetchProducts = jest.fn().mockResolvedValue(
      new RestResponse({
        body: createPagination({
          items: [firstProduct],
          currentPage: 1,
          itemsPerPage: 1,
          totalItems: 2,
        }),
      }),
    )
    fetchBrands = jest.fn().mockResolvedValue(new RestResponse({ body: [brand] }))
    fetchCategories = jest.fn().mockResolvedValue(new RestResponse({ body: [category] }))
    useRestContextMock.mockReturnValue({
      catalogService: { fetchProducts, fetchBrands, fetchCategories } as never,
      checkoutService: {} as never,
      marketingService: {} as never,
    })
  })

  it("should load the query, catalog metadata, and the first page", async () => {
    const { result } = renderHook(() => useCatalogScreen())

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(fetchProducts).toHaveBeenCalledWith({
      brandsIds: [],
      categoryId: undefined,
      page: 1,
      query: "bags",
    })
    expect(fetchBrands).toHaveBeenCalledTimes(1)
    expect(fetchCategories).toHaveBeenCalledTimes(1)
    expect(result.current.products).toEqual([firstProduct])
    expect(result.current.brands).toEqual([brand])
    expect(result.current.categories).toEqual([category])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.hasMore).toBe(true)
  })

  it("should append the next page when more products are available", async () => {
    fetchProducts
      .mockResolvedValueOnce(
        new RestResponse({
          body: createPagination({
            items: [firstProduct],
            currentPage: 1,
            itemsPerPage: 1,
            totalItems: 2,
          }),
        }),
      )
      .mockResolvedValueOnce(
        new RestResponse({
          body: createPagination({
            items: [secondProduct],
            currentPage: 2,
            itemsPerPage: 1,
            totalItems: 2,
          }),
        }),
      )
    const { result } = renderHook(() => useCatalogScreen())

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })
    await act(async () => {
      await result.current.loadMore()
      await Promise.resolve()
    })

    expect(fetchProducts).toHaveBeenLastCalledWith({
      brandsIds: [],
      categoryId: undefined,
      page: 2,
      query: "bags",
    })
    expect(result.current.products).toEqual([firstProduct, secondProduct])
    expect(result.current.hasMore).toBe(false)
  })

  it("should expose a catalog loading error", async () => {
    fetchProducts.mockResolvedValue(new RestResponse({ statusCode: 500 }))
    const { result } = renderHook(() => useCatalogScreen())

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(result.current.error).toBe("Não foi possível carregar o catálogo.")
    expect(result.current.products).toEqual([])
  })
})
