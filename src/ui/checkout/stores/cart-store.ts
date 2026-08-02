import { create } from "zustand"

import type { CartItem } from "@/core/checkout/entities/cart-item"
import {
  AsyncStorageProvider,
  readVersionedValue,
  writeVersionedValue,
} from "@/providers/storage/storage-providers"

const cartStorageKey = "sertton.cart"
const cartStorageVersion = 1

interface CartState {
  readonly isHydrated: boolean
  readonly items: readonly CartItem[]
  addItem(item: CartItem): void
  clear(): void
  hydrate(): Promise<void>
  removeItem(skuId: string): void
  setQuantity(skuId: string, quantity: number): void
}

const persistItems = async (items: readonly CartItem[]): Promise<void> => {
  await writeVersionedValue(AsyncStorageProvider, cartStorageKey, cartStorageVersion, items)
}

export const useCartStore = create<CartState>((set, get) => ({
  isHydrated: false,
  items: [],
  addItem: (item) => {
    const previousItems = get().items
    const existingItem = previousItems.find((cartItem) => cartItem.skuId === item.skuId)
    const items = existingItem
      ? previousItems.map((cartItem) =>
          cartItem.skuId === item.skuId
            ? {
                ...cartItem,
                product: item.product ?? cartItem.product,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem,
        )
      : [...previousItems, item]
    set({ items })
    void persistItems(items)
  },
  clear: () => {
    set({ items: [] })
    void persistItems([])
  },
  hydrate: async () => {
    const items =
      (await readVersionedValue<readonly CartItem[]>(
        AsyncStorageProvider,
        cartStorageKey,
        cartStorageVersion,
      )) ?? []
    set({ isHydrated: true, items })
  },
  removeItem: (skuId) => {
    const items = get().items.filter((item) => item.skuId !== skuId)
    set({ items })
    void persistItems(items)
  },
  setQuantity: (skuId, quantity) => {
    const items = get().items.map((item) =>
      item.skuId === skuId ? { ...item, quantity: Math.max(1, quantity) } : item,
    )
    set({ items })
    void persistItems(items)
  },
}))

export const selectCartItemCount = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0)
