import { act, renderHook } from '@testing-library/react-native'

import { useDialog } from '../useDialog'

describe('useDialog hook', () => {
  it('should open dialog', () => {
    const { result } = renderHook(useDialog)

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('should close dialog', () => {
    const { result } = renderHook(useDialog)

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
  })

  it('should change dialog open state and call the function passed as param of the hook if the latter exists', () => {
    const onOpenChangeMock = jest.fn()

    const { result } = renderHook(() => useDialog(onOpenChangeMock))

    expect(result.current.isOpen).toBe(false)
    const isOpen = true

    act(() => {
      result.current.handleOpenChange(isOpen)
    })

    expect(result.current.isOpen).toBe(isOpen)
    expect(onOpenChangeMock).toHaveBeenCalledWith(isOpen)
  })
})
