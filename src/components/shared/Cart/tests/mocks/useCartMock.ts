import { cartProductsMock } from "@/_tests_/mocks/core/cartProductsMock"
import { useCart } from "../../useCart"

export function useCartMock(returnUseCartMock?: Partial<ReturnType<typeof useCart>>) {
  jest.mocked(useCart).mockReturnValueOnce({
    handleRemoveAllItems: jest.fn(),
    redirectToCheckout: jest.fn(),
    getSelectedSkus: jest.fn(),
    isLoading: false,
    totalCartItems: 10,
    products: cartProductsMock,
    ...returnUseCartMock,
  })
}
