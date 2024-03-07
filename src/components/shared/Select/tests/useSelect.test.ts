import { act, waitFor } from '@testing-library/react-native'

import { useSelect } from '../useSelect'
import { renderHook } from '@/_tests_/customs/customRenderHook'

const defaultValue = 'Selecionar'
const hasError = false

const onChangeMock = jest.fn()

describe('useSelect hook', () => {
  it('should set the default value as the selected value', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, hasError)
    )

    expect(result.current.selectedValue).toBe(defaultValue)
  })

  it('should open', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, hasError)
    )

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('should close', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, hasError)
    )

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

  it('should change value', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, hasError)
    )

    const newValue = 'new value'

    act(() => {
      result.current.handleChangeValue(newValue)
    })

    expect(result.current.selectedValue).toBe(newValue)
  })

  it('should handle open change', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, hasError)
    )

    const isOpen = true

    act(() => {
      result.current.handleOpenChange(isOpen)
    })

    expect(result.current.isOpen).toBe(isOpen)
  })

  it('should reset value', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, hasError)
    )

    const newValue = 'new value'

    act(() => {
      result.current.handleChangeValue(newValue)
    })

    expect(result.current.selectedValue).toBe(newValue)

    act(() => {
      result.current.reset()
    })

    expect(result.current.selectedValue).toBe(defaultValue)
  })

  it('should return error if exists', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, true)
    )

    expect(result.current.error).toBe(true)
  })

  it('should be loading after change value', () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, true)
    )

    const newValue = 'new value'

    act(() => {
      result.current.handleChangeValue(newValue)
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should call a function on change value passing to it the new value after loading', async () => {
    const { result } = renderHook(() =>
      useSelect(defaultValue, onChangeMock, true)
    )

    const newValue = 'new value'

    act(() => {
      result.current.handleChangeValue(newValue)
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isOpen).toBe(false)
      expect(result.current.error).toBe(false)
      expect(onChangeMock).toHaveBeenCalledWith(newValue)
    })
  })
})
