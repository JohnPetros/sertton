import { waitFor } from "@testing-library/react-native"

import type { Discount } from "@/@types/Discount"
import type { CartProduct } from "@/@types/CartProduct"

import { renderHook } from "@/_tests_/customs/customRenderHook"
import { productsMock } from "@/_tests_/mocks/core/productsMock"
import { skusMock } from "@/_tests_/mocks/core/skusMock"
import { useApiMock } from "@/_tests_/mocks/services/apiMock"
import { cartProductsMock } from "@/_tests_/mocks/core/cartProductsMock"
import { discountsMock } from "@/_tests_/mocks/core/discountsMock"

import { useCartSummary } from "../useCartSummary"

jest.mock('@/services/api')

describe('useCartSummary', () => {
  it('should calculate total products to pay', () => {
    useApiMock()

    const cartProductsMock: CartProduct[] = [
      {
        ...productsMock[0],
        skus: [
          {
            ...skusMock[0],
            salePrice: 100,
          }
        ],
        quantity: 2,
        selectedSkuId: skusMock[0].id,
      },
      {
        ...productsMock[1],
        skus: [
          {
            ...skusMock[0],
            salePrice: 50,
          }
        ],
        quantity: 1,
        selectedSkuId: skusMock[0].id,
      },
    ]

    const { result } = renderHook(() => useCartSummary(cartProductsMock))

    const total = result.current.calculateTotalProductsCost()

    expect(total).toBe(250)
  })

  it('should calculate total products discout', () => {
    useApiMock()

    const cartProductsMock: CartProduct[] = [
      {
        ...productsMock[0],
        skus: [
          {
            ...skusMock[0],
            salePrice: 100,
            discountPrice: 20,
          }
        ],
        quantity: 2,
        selectedSkuId: skusMock[0].id,
      },
      {
        ...productsMock[1],
        skus: [
          {
            ...skusMock[0],
            salePrice: 50,
            discountPrice: 10,
          }
        ],
        quantity: 1,
        selectedSkuId: skusMock[0].id,
      },
    ]

    const { result } = renderHook(() => useCartSummary(cartProductsMock))

    const total = result.current.calculateTotalProductsDiscount()

    expect(total).toBe(200)
  })

  it('should calculate items count', () => {
    useApiMock()

    const cartProductsMock: CartProduct[] = [
      {
        ...productsMock[0],
        selectedSkuId: skusMock[0].id,
        quantity: 3,
      },
      {
        ...productsMock[1],
        quantity: 2,
        selectedSkuId: skusMock[1].id,
      },
    ]

    const { result } = renderHook(() => useCartSummary(cartProductsMock))

    const itemsCount = result.current.calculateItemsCount()

    expect(itemsCount).toBe(5)
  })

  it('should calculate extra discounts if it is possible', async () => {
    const discounts: Discount[] = [
      {
        minCost: 1,
        maxCost: 100,
        percent: 5,
      },
      {
        minCost: 50,
        maxCost: 500,
        percent: 5,
      },
      {
        minCost: 1000,
        maxCost: 10000,
        percent: 5,
      }
    ]

    useApiMock({ getDiscounts: async () => discounts })

    await waitFor(() => {

      const { result } = renderHook(() => useCartSummary(cartProductsMock))


      const totalDiscount = result.current.calculateExtraDiscounts(100, 50)

      expect(totalDiscount).toBe(55)
    })
  })

  it('should calculate extra discounts if it is possible', async () => {
    const discountsMock: Discount[] = [
      {
        minCost: 1,
        maxCost: 100,
        percent: 5,
      },
      {
        minCost: 50,
        maxCost: 500,
        percent: 5,
      },
      {
        minCost: 1000,
        maxCost: 10000,
        percent: 5,
      }
    ]

    useApiMock({ getDiscounts: async () => discountsMock })

    await waitFor(() => {

      const { result } = renderHook(() => useCartSummary(cartProductsMock))

      const totalDiscount = result.current.calculateExtraDiscounts(100, 50)

      expect(totalDiscount).toBe(55)
    })
  })

  it('should set cart summary on render', async () => {
    useApiMock({ getDiscounts: async () => discountsMock })

    await waitFor(() => {

      const { result } = renderHook(() => useCartSummary(cartProductsMock))

      const totalProductsCost = result.current.calculateTotalProductsCost()

      const totalProductsDiscount = result.current.calculateTotalProductsDiscount()

      const itemsCount = result.current.calculateItemsCount()

      const totalDiscount = result.current.calculateExtraDiscounts(totalProductsCost, totalProductsDiscount)

      expect(result.current.itemsCount).toBe(itemsCount)
      expect(result.current.totalDiscount).toBe(totalDiscount)
      expect(result.current.subtotalCost).toBe(totalProductsCost)
      expect(result.current.totalCost).toBe(totalProductsCost - totalDiscount)
    })
  })
})