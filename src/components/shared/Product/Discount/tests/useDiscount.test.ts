import { renderHook } from '@testing-library/react-native'

import { useDiscount } from '../useDiscount'

describe('useDiscount hook', () => {
  it('should calculate discount in percentage', () => {
    const { result } = renderHook(() => useDiscount(75.1, 115.1))
    expect(result.current).toBe(34)
  })
})
