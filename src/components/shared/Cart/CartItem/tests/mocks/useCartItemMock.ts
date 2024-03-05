import { skusMock } from "@/_tests_/mocks/core/skusMock"
import { useCartItem } from "../../useCartItem"

export function useCartItemMock(returnMock?: Partial<ReturnType<typeof useCartItem>>) {
  jest.mocked(useCartItem).mockReturnValueOnce({
    handleQuantityChange: jest.fn(),
    handleRemoveItem: jest.fn(),
    handleReachMaxInStock: jest.fn(),
    selectedSku: skusMock[0],
    ...returnMock,
  })
}
