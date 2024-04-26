import { mask as originalMarkFunction } from 'react-native-mask-text'

import type { Mask } from '@/@types/Mask'
import { renderHook } from '@/_tests_/customs/customRenderHook'
import { MASKS } from '@/utils/constants/masks'

import { useMask } from '../useMask'

describe('useMask hook', () => {
  it.each(Object.keys(MASKS))('should format value', (mask) => {
    const { result } = renderHook(() => useMask(mask as Mask))

    const value = '123456'

    const formattedValue = result.current(value)

    const expectedResult = originalMarkFunction(value, MASKS[mask as Mask])

    expect(formattedValue).toBe(expectedResult)
  })
})
