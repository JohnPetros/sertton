import { useSkuSelectors } from "../useSkuSelectors"

import { renderHook } from "@/_tests_/customs/customRenderHook"
import { productsMock } from "@/_tests_/mocks/core/productsMock"
import { useApiMock } from "@/_tests_/mocks/services/apiMock"
import { act, waitFor } from "@testing-library/react-native"

const product = productsMock[0]
const onSkuChangeMock = jest.fn()

jest.mock('@/services/api')

jest.useFakeTimers()

describe('useSkuSelectors', () => {
  it('should fetch skus on render', async () => {
    const apiMock = useApiMock()

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock))

      const skusMock = await apiMock.getSkusByProductId(product.id)

      expect(result.current.skus).toEqual(skusMock)

    })
  })

  it('should set variation names on render', async () => {
    const apiMock = useApiMock()

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock))

      const skusMock = await apiMock.getSkusByProductId(product.id)

      act(() => {
        result.current.setSkusVariations(skusMock)
      })

      expect(result.current.variationNames).toEqual(skusMock.map((sku) => {
        return sku.variations.map((variation) => variation.name)
      }))
    })
  })
})