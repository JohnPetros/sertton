import { StateCreator, create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { INITIAL_CART_STORE_STATE } from './constants/initial-cart-store-state'
import { CartStoreProps } from './types/CartStoreProps'

import { MmkvStorageProvider } from '@/services/storage/mmkv'
import { STORAGE } from '@/utils/constants/storage'

const cartStore: StateCreator<
  CartStoreProps,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  CartStoreProps
> = (set) => ({
  state: INITIAL_CART_STORE_STATE,
  actions: {
    addItem(item) {
      set(({ state }) => {
        const currentItemIndex = state.items.findIndex(
          (currentItem) => currentItem.skuId === item.skuId
        )

        if (currentItemIndex !== -1) {
          state.items.splice(currentItemIndex, 1)
        }

        state.items.push(item)
      })
    },

    removeItem(itemSkuId: string) {
      set(({ state }) => {
        const updatedItems = state.items.filter((item) => item.skuId !== itemSkuId)
        state.items = updatedItems
      })
    },

    removeAllItems() {
      set(({ state }) => {
        state.items = []
      })
    },

    setItemQuantity(itemSkuId: string, itemQuantity: number) {
      set(({ state }) => {
        state.items = state.items.map((item) =>
          item.skuId === itemSkuId ? { ...item, quantity: itemQuantity } : item
        )
      })
    },
  },
})

export const useCartStore = create(
  persist(immer(cartStore), {
    version: 1,
    name: STORAGE.keys.cart,
    // storage: createJSONStorage(MmkvStorageProvider),
    partialize: (state) => {
      return Object.fromEntries(
        Object.entries(state).filter(([key]) => !['actions'].includes(key))
      )
    },
  })
)
