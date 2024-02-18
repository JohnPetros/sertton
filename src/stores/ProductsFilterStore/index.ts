import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { INITIAL_PRODUCTS_FILTER_STORE } from './constants/initial-products-filter-store-state'
import { ProductsfilterStoreProps } from './types/ProductsfilterStoreProps'

export const useProductsFilterStore = create<ProductsfilterStoreProps>()(
  immer((set) => {
    return {
      state: INITIAL_PRODUCTS_FILTER_STORE,
      actions: {
        setSearch(search: string) {
          return set(({ state }) => {
            state.search = search
            state.categoryId = ''
            state.brandsIds = []
          })
        },
        setCategoryId(categoryId: string) {
          return set(({ state }) => {
            state.categoryId = categoryId
            state.search = ''
            state.brandsIds = []
          })
        },
        setBrandsIds(brandsIds: string[]) {
          return set(({ state }) => {
            state.brandsIds = brandsIds
          })
        },
      },
    }
  })
)
