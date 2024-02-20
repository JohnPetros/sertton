import type { CartStoreActions } from "./CartStoreActions"
import type { CartStoreState } from "./CartStoreState"

export type CartStoreProps = {
  state: CartStoreState
  actions: CartStoreActions
}