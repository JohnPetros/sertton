import { renderHook } from "@/_tests_/customs/customRenderHook"
import { useProductsList } from "../useProductList"
import { productsMock } from "@/_tests_/mocks/core/productsMock"
import { SORTERS } from "@/utils/constants/sorters"
import { useProductsFilterStoreMock } from "@/_tests_/mocks/stores/ProductsFilterStoreMock"

const onEndReachedMock = jest.fn()
const setSelectedSorterMock = jest.fn()

describe('useProductsList hook', () => {
  it('should call a function on reach the end of the list and there is not a fetching', () => {
    useProductsFilterStoreMock()

    const { result } = renderHook(() => useProductsList(
      {
        products: productsMock,
        onEndReached: onEndReachedMock,
        onSelectSorter: setSelectedSorterMock
      }
    ))

    result.current.handleListEndReached()

    expect(onEndReachedMock).toHaveBeenCalled()
  })

  it('should set selected sorter on select change', () => {
    useProductsFilterStoreMock()

    const { result } = renderHook(() => useProductsList(
      {
        products: productsMock,
        onEndReached: onEndReachedMock,
        onSelectSorter: setSelectedSorterMock
      }
    ))

    const selectedSorter = SORTERS[0]

    result.current.handleSelectChange(selectedSorter.name)

    expect(setSelectedSorterMock).toHaveBeenCalledWith(selectedSorter)
  })
})
