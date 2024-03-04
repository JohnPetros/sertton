import { act, renderHook, waitFor } from '@testing-library/react-native'

import { skusMock } from '@/_tests_/mocks/core/skusMock'

import { useCartItem } from '../useCartItem'
import { useCartStoreMock } from '@/_tests_/mocks/stores/CartStoreMock'

describe('useCartItem hook', () => {
  it('should select sku', () => {
    useCartStoreMock()

    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id))

    expect(result.current.selectedSku).toEqual(selectedSku)
  })

  it('should remove cart item by selected sku id', () => {
    const { removeItemMock } = useCartStoreMock()

    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id))

    act(() => {
      result.current.handleRemoveItem()
    })

    expect(removeItemMock).toHaveBeenCalledWith(selectedSku.id)
  })

  it('should not set cart item quantity if new quantity is larger than the selected sku stock', async () => {
    const { setItemQuantityMock } = useCartStoreMock()

    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id))

    const newQuantity = selectedSku.stock + 1

    act(() => {
      result.current.handleQuantityChange(newQuantity)
    })

    await waitFor(() => {
      expect(setItemQuantityMock).not.toHaveBeenCalledWith(
        selectedSku.id,
        newQuantity
      )
    })
  })
})
