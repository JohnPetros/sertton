import { renderHook } from '@testing-library/react-native'

import { DialogRef } from '../../Dialog/types/DialogRef'
import { useCartDialog } from '../useCartDialog'
import { productsMock } from '@/_tests_/mocks/core/productsMock'
import { useRefMock } from '@/_tests_/mocks/libs/react/useRefMock'
import { SkuSelectorsRef } from '../../SkuSelectors/types/SkuSelectorsRef'
import { CartItem } from '@/@types/CartItem'
import { useCartStoreMock } from '@/_tests_/mocks/stores/CartStoreMock'

const productMock = productsMock[0]

const quantity = {
  _current: 1,
  set current(newQuantity: number) {
    this._current = newQuantity
  },
  get current() {
    return this._current
  },
}

const openMock = jest.fn()
const closeMock = jest.fn()
const onAddSkuToCartMock = jest.fn()

const dialogRefMock = useRefMock<DialogRef>({
  open: openMock,
  close: closeMock,
})

const skuSelectsMock = useRefMock<SkuSelectorsRef>({
  selectedSku: null,
  onAddSkuToCart: onAddSkuToCartMock,
})

describe('useCartDialog hook', () => {
  it('should change the product quantity', () => {
    useCartStoreMock()

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    const newQuantity = 3

    result.current.handleQuantityChange(newQuantity)

    expect(quantity._current).toBe(newQuantity)
  })

  it('should add an item to the cart if skuSelectsRef is null', () => {
    const { addItemMock } = useCartStoreMock()

    const skuSelectsMock = useRefMock<SkuSelectorsRef | null>(null)

    skuSelectsMock.current

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    expect(addItemMock).not.toHaveBeenCalled()
  })

  it('should not add an item to the cart if there are not product skus and onAddSkuToCart function return false', () => {
    const { addItemMock } = useCartStoreMock()

    const skuSelectsMock = useRefMock<SkuSelectorsRef>({
      selectedSku: null,
      onAddSkuToCart: () => false,
    })

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: [],
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    expect(addItemMock).not.toHaveBeenCalled()
  })

  it('should not add an item to the cart if selected sku is null', () => {
    const { addItemMock } = useCartStoreMock()

    const skuSelectsMock = useRefMock<SkuSelectorsRef>({
      selectedSku: null,
      onAddSkuToCart: () => true,
    })

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    expect(addItemMock).not.toHaveBeenCalled()
  })

  it('should add an item to the cart', () => {
    const { addItemMock } = useCartStoreMock()

    const selectedSku = productMock.skus[0]

    const skuSelectsMock = useRefMock<SkuSelectorsRef>({
      selectedSku,
      onAddSkuToCart: () => true,
    })

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    const newItem: CartItem = {
      slug: productMock.slug,
      skuId: selectedSku.id,
      quantity: quantity._current,
    }

    expect(addItemMock).toHaveBeenCalledWith(newItem)
  })
})
