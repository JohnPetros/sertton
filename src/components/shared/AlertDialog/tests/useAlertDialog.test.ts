import { renderHook } from "@/_tests_/customs/customRenderHook"
import { useAlertDialog } from "../useAlertDialog"
import { act } from "@testing-library/react-native"

const onCancelMock = jest.fn()

describe('useAlertDialog hook', () => {
  it('should open', () => {
    const { result } = renderHook(() => useAlertDialog(onCancelMock))

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.open()
    })

  })

  it('should close', () => {
    const { result } = renderHook(() => useAlertDialog(onCancelMock))

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

  it('should set isOpen state on open change', () => {
    const { result } = renderHook(() => useAlertDialog(onCancelMock))

    expect(result.current.isOpen).toBe(false)

    const isOpen = true

    act(() => {
      result.current.handleOpenChange(isOpen)
    })

    expect(result.current.isOpen).toBe(isOpen)
  })

  it('should call a function on open change', () => {
    const { result } = renderHook(() => useAlertDialog(onCancelMock))

    act(() => {
      result.current.handleOpenChange(false)
    })

    expect(onCancelMock).toHaveBeenCalled()
  })
})