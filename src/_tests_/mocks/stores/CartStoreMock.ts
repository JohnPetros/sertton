import { act } from "@testing-library/react-native"

import { useCartStore } from "@/stores/CartStore"
import { CartStoreState } from "@/stores/CartStore/types/CartStoreState"

import { cartItemsMock } from "../core/cartItemsMock"

const addItemMock = jest.fn()
const removeItemMock = jest.fn()
const removeAllItemsMock = jest.fn()
const setItemQuantityMock = jest.fn()

export function useCartStoreMock(state?: CartStoreState) {
  act(() => {
    useCartStore.setState({
      state: {
        items: cartItemsMock,
        ...state,
      },
      actions: {
        addItem: addItemMock,
        removeItem: removeItemMock,
        removeAllItems: removeAllItemsMock,
        setItemQuantity: setItemQuantityMock,
      }
    }
    )
  })

  return {
    itemsMock: cartItemsMock,
    addItemMock,
    removeItemMock,
    removeAllItemsMock,
    setItemQuantityMock,
  }
}