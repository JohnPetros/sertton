import type { CartItem } from "@/@types/CartItem"

export type CartStoreActions = {
  addItem: (item: CartItem) => void
  removeItem: (itemSkuId: string) => void
  removeAllItems: () => void
  setItemQuantity: (itemSkuId: string, itemQuantity: number) => void
}