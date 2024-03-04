import * as Linking from 'expo-linking'

import { act, waitFor } from "@testing-library/react-native"
import { renderHook } from "@/_tests_/customs/customRenderHook"
import { useCartStoreMock } from "@/_tests_/mocks/stores/CartStoreMock"

import { useCart } from "../useCart"
import { CartProduct } from "@/@types/CartProduct"
import { productsMock } from "@/_tests_/mocks/core/productsMock"
import { cartItemsMock } from "@/_tests_/mocks/core/cartItemsMock"
import { useApiMock } from "@/_tests_/mocks/services/apiMock"
import { useRouterMock } from '@/_tests_/mocks/libs/expo/useRouterMock'

jest.mock('@/services/api')

jest.mock('expo-router')

jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
}))

describe('useCart hook', () => {
  it('should return cart products', async () => {
    await waitFor(() => {
      useApiMock()
      useCartStoreMock()

      const cartProductsMock: CartProduct[] = productsMock.slice(
        0,
        cartItemsMock.length
      )
        .map((productMock, index) => ({
          ...productMock,
          quantity: cartItemsMock[index].quantity,
          selectedSkuId: cartItemsMock[index].skuId,
        }))

      const { result } = renderHook(useCart)

      expect(result.current.products).toEqual(cartProductsMock)
    })
  })

  it('should return the total number of cart items', async () => {
    await waitFor(() => {
      useApiMock()
      const { itemsMock } = useCartStoreMock()

      const { result } = renderHook(useCart)

      expect(result.current.totalCartItems).toBe(itemsMock.length)
    })
  })

  it('should return the selected sku of each cart product', async () => {
    await waitFor(() => {
      useApiMock()
      useCartStoreMock()

      const { result } = renderHook(useCart)

      const selectedSkusIds = cartItemsMock?.map((item) => item.skuId)

      const selectedSkus = result.current.getSelectedSkus()

      expect(selectedSkus).toEqual(
        productsMock.slice(0, cartItemsMock.length).map((product, index) => ({
          ...product.skus.find(sku => selectedSkusIds?.includes(sku.id)),
          quantity: cartItemsMock[index].quantity,
        }))
      )
    })
  })

  it('should open checkout web page passing the skus uri on url', async () => {
    await waitFor(() => {
      const api = useApiMock()
      useCartStoreMock()
      useRouterMock()

      const { result } = renderHook(useCart)

      const selectedSkus = result.current.getSelectedSkus()

      const skusUri = selectedSkus
        .map((sku) => `${sku.yampiToken}:${sku.quantity}`)
        .join(',')

      const checkoutUrl = api.getCheckoutUrl()

      result.current.redirectToCheckout()

      expect(Linking.openURL).toHaveBeenCalledWith(`${checkoutUrl}/${skusUri}`)
    })
  })

  it('should redirect user to home screen on open checkout web page', async () => {
    await waitFor(() => {
      useApiMock()
      useCartStoreMock()
      const { pushMock } = useRouterMock()

      const { result } = renderHook(useCart)

      result.current.redirectToCheckout()

      expect(pushMock).toHaveBeenCalledWith('/(stack)/(drawer)/(tabs)/home')
    })
  })

  it('should remove all cart items on open checkout web page', async () => {
    await waitFor(() => {
      useApiMock()
      const { removeAllItemsMock } = useCartStoreMock()
      useRouterMock()

      const { result } = renderHook(useCart)

      result.current.redirectToCheckout()

      expect(removeAllItemsMock).toHaveBeenCalled()
    })
  })

  it('should remove all cart items', () => {
    const { removeAllItemsMock } = useCartStoreMock()

    const { result } = renderHook(useCart)

    act(() => {
      result.current.handleRemoveAllItems()
    })

    expect(removeAllItemsMock).toHaveBeenCalled()
  })
})