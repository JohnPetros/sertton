import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useProductsFilterStoreMock } from '@/_tests_/mocks/stores/ProductsFilterStoreMock'
import { useProducts } from '../useProducts'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { act, waitFor } from '@testing-library/react-native'
import { productsMock } from '@/_tests_/mocks/core/productsMock'
import { GetProductsParams } from '@/services/api/interfaces/IProductsController'

jest.mock('@/services/api')

describe('useProducts hook', () => {
  it('should get products using the filter params from the products filter store', async () => {
    const search = 'search mock'
    const brandsIds = ['1', '2']
    const categoryId = 'category id mock'

    useProductsFilterStoreMock({
      search,
      brandsIds,
      categoryId,
    })

    const getProductsMock = jest.fn().mockReturnValueOnce({
      products: productsMock,
      perPage: 2,
      totalProductsCount: productsMock.length,
    })

    useApiMock({ getProducts: getProductsMock })

    await waitFor(() => {
      renderHook(useProducts)

      expect(getProductsMock).toHaveBeenCalledWith({
        page: 1,
        search,
        brandsIds,
        categoryId,
        sorter: null,
      })
    })
  })

  it('should indicate that there is a next page if there are products for the current page', async () => {
    useProductsFilterStoreMock()

    useApiMock()

    const { result, rerender } = await waitFor(() => {
      return renderHook(useProducts)
    })

    expect(result.current.hasNextPage).toBe(false)
    rerender(undefined)
    expect(result.current.hasNextPage).toBe(true)
  })

  it('should indicate that there is a not next page if there are no products for the current page', async () => {
    useProductsFilterStoreMock()

    const getProductsMock = async (_: GetProductsParams) => {
      return {
        products: [],
        perPage: 2,
        totalProductsCount: productsMock.length,
      }
    }

    useApiMock({ getProducts: getProductsMock })

    const { result, rerender } = await waitFor(() => {
      return renderHook(useProducts)
    })

    rerender(undefined)
    expect(result.current.hasNextPage).toBe(false)
  })

  it('should indicate that there is not a next page if there are no products for the next page', async () => {
    useProductsFilterStoreMock()

    const getProductsMock = async (_: GetProductsParams) => {
      return {
        products: productsMock,
        perPage: productsMock.length,
        totalProductsCount: productsMock.length,
      }
    }

    useApiMock({ getProducts: getProductsMock })

    const { result, rerender } = await waitFor(() => {
      return renderHook(useProducts)
    })

    rerender(undefined)
    expect(result.current.hasNextPage).toBe(false)
  })

  it('should fetch the products for next page on reach the end of the products list', async () => {
    useProductsFilterStoreMock()

    const PER_PAGE = 2

    const getProductsMock = async ({ page }: GetProductsParams) => {
      const startIndex = page * PER_PAGE

      return {
        products: productsMock.slice(startIndex, startIndex + PER_PAGE),
        perPage: PER_PAGE,
        totalProductsCount: productsMock.length,
      }
    }

    useApiMock({ getProducts: getProductsMock })

    const { result, rerender } = await waitFor(() => {
      return renderHook(useProducts)
    })

    rerender(undefined)

    expect(result.current.products.length).toBe(2)

    act(() => {
      result.current.handleProductsListEndReached()
    })

    await waitFor(() => {
      expect(result.current.products.length).toBe(4)
    })
  })

  it('should indicate that there is a next page if there are products for the next page', async () => {
    useProductsFilterStoreMock()

    const PER_PAGE = 1

    const getProductsMock = async ({ page }: GetProductsParams) => {
      const startIndex = page * PER_PAGE

      return {
        products: productsMock.slice(startIndex, startIndex + PER_PAGE),
        perPage: PER_PAGE,
        totalProductsCount: productsMock.length,
      }
    }

    useApiMock({ getProducts: getProductsMock })

    const { result, rerender } = await waitFor(() => {
      return renderHook(useProducts)
    })

    rerender(undefined)

    act(() => {
      result.current.handleProductsListEndReached()
    })

    await waitFor(() => {
      expect(result.current.hasNextPage).toBe(true)
    })
  })

  it('should set category id to an empty string on remove category', async () => {
    useApiMock()

    const { setCategoryIdMock } = useProductsFilterStoreMock()

    const { result } = await waitFor(() => {
      return renderHook(useProducts)
    })

    result.current.handleRemoveCategory()

    expect(setCategoryIdMock).toHaveBeenCalledWith('')
  })
})
