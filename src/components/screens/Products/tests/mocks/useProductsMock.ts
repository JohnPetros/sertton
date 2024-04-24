import { useProducts } from '../../useProducts'

const fetchNextPageMock = jest.fn()
const refetchMock = jest.fn()
const setSelectedSorterMock = jest.fn()
const handleProductsListEndReachedMock = jest.fn()
const handleRemoveCategoryMock = jest.fn()

export function useProductsMock(
  mockedReturn?: Partial<ReturnType<typeof useProducts>>,
) {
  jest.mocked(useProducts).mockReturnValueOnce({
    products: [],
    category: null,
    isLoading: false,
    hasNextPage: false,
    fetchNextPage: fetchNextPageMock,
    refetch: refetchMock,
    setSelectedSorter: setSelectedSorterMock,
    handleProductsListEndReached: handleProductsListEndReachedMock,
    handleRemoveCategory: handleRemoveCategoryMock,
    ...mockedReturn,
  })

  return {
    fetchNextPageMock,
    refetchMock,
    setSelectedSorterMock,
    handleProductsListEndReachedMock,
    handleRemoveCategoryMock,
  }
}
