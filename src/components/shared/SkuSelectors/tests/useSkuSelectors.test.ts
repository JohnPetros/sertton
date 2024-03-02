import { useSkuSelectors } from "../useSkuSelectors"

import { renderHook } from "@/_tests_/customs/customRenderHook"
import { productsMock } from "@/_tests_/mocks/core/productsMock"
import { useApiMock } from "@/_tests_/mocks/services/apiMock"
import { act, waitFor } from "@testing-library/react-native"
import { skusMock } from "@/_tests_/mocks/core/skusMock"
import { useRefMock } from "@/_tests_/mocks/hooks/useRefMock"
import { SelectRef } from "../../Select/types/SelectRef"

jest.mock('@/services/api')

jest.useFakeTimers()

const onSkuChangeMock = jest.fn()

const resetMock = jest.fn()
const openMock = jest.fn()

const selectRefsMock = useRefMock<SelectRef[]>([{ open: openMock, reset: resetMock, value: '', }])
const product = productsMock[0]

describe('useSkuSelectors hook', () => {
  it('should fetch skus on render', async () => {
    const apiMock = useApiMock()

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      const skusMock = await apiMock.getSkusByProductId(product.id)

      expect(result.current.skus).toEqual(skusMock)

    })
  })

  it('should set unique variation names on render', async () => {
    useApiMock({ getSkusByProductId: async () => skusMock })

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      expect(result.current.variationNames).toEqual(['Color', 'Size'])
    })
  })

  it('should set the first fetched sku as the selected sku on render', async () => {
    useApiMock({ getSkusByProductId: async () => skusMock })

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      expect(result.current.selectedSku).toEqual(skusMock[0])
    })
  })

  it('should set the variations as the variations that have the fist variation name on render', async () => {
    const firstVariationName = 'Color'

    useApiMock({ getSkusByProductId: async () => skusMock })

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      expect(result.current.variations?.map(({ name }) => name))
        .toEqual(Array.from({ length: result.current.variations.length }).fill(firstVariationName))
    })
  })

  it('should include the new selected variation value to current selected variation values', async () => {
    const newSelectedVariationValue = 'Blue'
    const secondSelectedVariationValue = 'selected value 2'
    const thirdSelectedVariationValue = 'selected value 3'

    useApiMock({ getSkusByProductId: async () => skusMock })

    const selectRefsMock = useRefMock<SelectRef[]>(
      [
        { open: openMock, reset: resetMock, value: secondSelectedVariationValue, },
        { open: openMock, reset: resetMock, value: thirdSelectedVariationValue, }
      ]
    )

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      act(() => {
        result.current.handleSelectChange(1, newSelectedVariationValue)
      })

      expect(result.current.selectedVariationsValues)
        .toEqual([secondSelectedVariationValue, thirdSelectedVariationValue, newSelectedVariationValue])
    })
  })

  it('should remove all selected variation values except the new selected variation value if the new selected variation value belongs the first variation', async () => {
    const newSelectedVariationValue = 'Blue'
    const secondSelectedVariationValue = 'selected value 2'
    const thirdSelectedVariationValue = 'selected value 3'

    useApiMock({ getSkusByProductId: async () => skusMock })

    const selectRefsMock = useRefMock<SelectRef[]>(
      [
        { open: openMock, reset: resetMock, value: secondSelectedVariationValue, },
        { open: openMock, reset: resetMock, value: thirdSelectedVariationValue, }
      ]
    )

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      act(() => {
        result.current.handleSelectChange(0, newSelectedVariationValue)
      })

      expect(result.current.selectedVariationsValues)
        .toEqual([newSelectedVariationValue])
    })
  })

  it('should reset all selectors except the first selector if the new selected variation value belongs the first variation', async () => {
    const newSelectedVariationValue = 'Blue'
    const secondSelectedVariationValue = 'selected value 2'
    const thirdSelectedVariationValue = 'selected value 3'

    useApiMock({ getSkusByProductId: async () => skusMock })

    const selectRefsMock = useRefMock<SelectRef[]>(
      [
        { open: openMock, reset: resetMock, value: secondSelectedVariationValue, },
        { open: openMock, reset: resetMock, value: thirdSelectedVariationValue, }
      ]
    )

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      act(() => {
        result.current.handleSelectChange(0, newSelectedVariationValue)
      })

    })

    expect(resetMock).toHaveBeenCalled()
  })

  it('should insert non first variation values if the new selected variation value belongs the first variation', async () => {
    const newSelectedVariationValue = 'Blue'
    const secondSelectedVariationValue = 'selected value 2'
    const thirdSelectedVariationValue = 'selected value 3'

    useApiMock({ getSkusByProductId: async () => skusMock })

    const selectRefsMock = useRefMock<SelectRef[]>(
      [
        { open: openMock, reset: resetMock, value: secondSelectedVariationValue, },
        { open: openMock, reset: resetMock, value: thirdSelectedVariationValue, }
      ]
    )

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      act(() => {
        result.current.handleSelectChange(0, newSelectedVariationValue)
      })

      expect(result.current.variations.map(({ name }) => name).includes('Size')).toBe(true)
    })
  })

  it('should select the sku whose variation values match the selected variation values', async () => {
    useApiMock({ getSkusByProductId: async () => skusMock })

    const selectRefsMock = useRefMock<SelectRef[]>(
      [
        { open: openMock, reset: resetMock, value: 'Red', },
      ]
    )

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      act(() => {
        result.current.handleSelectChange(0, 'Red')
      })

      act(() => {
        result.current.handleSelectChange(1, 'S')
      })

      expect(result.current.selectedSku).toEqual(skusMock[1])
    })
  })

  it('should call a function on change selected sku', async () => {
    useApiMock({ getSkusByProductId: async () => skusMock })

    const selectRefsMock = useRefMock<SelectRef[]>(
      [
        { open: openMock, reset: resetMock, value: 'Red', },
      ]
    )

    await waitFor(async () => {
      const { result } = renderHook(() => useSkuSelectors(product.id, onSkuChangeMock, selectRefsMock))

      act(() => {
        result.current.handleSelectChange(0, 'Red')
      })

      act(() => {
        result.current.handleSelectChange(1, 'S')
      })

      const selectedSku = skusMock[1]

      expect(result.current.selectedSku).toEqual(selectedSku)
      expect(onSkuChangeMock).toHaveBeenCalledWith(selectedSku)
    })
  })
})