import { renderHook } from '@/_tests_/customs/customRenderHook'

import { useDebounce } from '../useDebounce'
import { useDebouncedCallback } from 'use-debounce'

jest.mock('use-debounce', () => ({
  useDebouncedCallback: jest.fn(),
}))

const callbackMock = jest.fn()

describe('useDebounce hook', () => {
  it('should return a debounced function', () => {
    const mockCancel = jest.fn()

    // @ts-ignored
    useDebouncedCallback.mockReturnValue({
      cancel: mockCancel,
    })

    const { result } = renderHook(() => useDebounce(callbackMock, 100))

    expect(jest.isMockFunction(result.current.cancel)).toBe(true)
  })

  it('should call the cancel method on unmount', () => {
    const mockCancel = jest.fn()

    // @ts-ignore
    useDebouncedCallback.mockReturnValue({
      cancel: mockCancel,
    })

    const { unmount } = renderHook(() => useDebounce(() => {}, 500))

    unmount()

    expect(mockCancel).toHaveBeenCalled()
  })
})
