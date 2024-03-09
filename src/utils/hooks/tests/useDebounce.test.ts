import { renderHook } from "@/_tests_/customs/customRenderHook"

import { useDebounce } from '../useDebounce'
import { DebouncedState, useDebouncedCallback } from 'use-debounce'

jest.mock('use-debounce', () => ({
  useDebouncedCallback: jest.fn(),
}))


const callbackMock = jest.fn()

describe('useDebounce hook', () => {
  it('should return a debounced function', () => {
    // @ts-ignore
    useDebouncedCallback.mockReturnValue({
      cancel: jest.fn(),
    })

    const { result } = renderHook(() => useDebounce(callbackMock, 100))

    expect(result.current).toBe({ cancel: jest.fn() })
  })

  it('should call the cancel method on unmount', () => {
    const mockCancel = jest.fn()

    // @ts-ignore
    useDebouncedCallback.mockReturnValue({
      cancel: mockCancel,
    })

    const { unmount } = renderHook(() => useDebounce(() => { }, 500))

    unmount()

    expect(mockCancel).toHaveBeenCalled()
  })
})
