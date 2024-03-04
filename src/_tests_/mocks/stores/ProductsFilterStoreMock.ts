import { useProductsFilterStore } from "@/stores/ProductsFilterStore"
import { INITIAL_PRODUCTS_FILTER_STORE } from "@/stores/ProductsFilterStore/constants/initial-products-filter-store-state"
import type { ProductsfilterStoreState } from "@/stores/ProductsFilterStore/types/ProductsFilterStoreState"

const setSearchMock = jest.fn()
const setBrandsIdsMock = jest.fn()
const setCategoryIdMock = jest.fn()


export function useProductsFilterStoreMock(
  stateMock?: Partial<ProductsfilterStoreState>
) {
  useProductsFilterStore.setState({
    actions: {
      setSearch: setSearchMock,
      setBrandsIds: setBrandsIdsMock,
      setCategoryId: setCategoryIdMock,
    },
    state: {
      ...INITIAL_PRODUCTS_FILTER_STORE,
      ...stateMock
    },
  })

  return {
    setSearchMock,
    setBrandsIdsMock,
    setCategoryIdMock,
  }
}
