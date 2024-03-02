import { act } from '@testing-library/react-native'

import { useInput } from '../useInput'
import { renderHook } from '@/_tests_/customs/customRenderHook'


const error = ''
const isDisabled = false
const max = 100
const onChangeTextMock = jest.fn()

describe('useInput hook', () => {
  it('should set input and icon states to default on blur', () => {
    const { result } = renderHook(() =>
      useInput({
        error,
        keyboardType: 'text',
        isDisabled,
        max,
        mask: 'cpf',
        onChangeText: onChangeTextMock,
      })
    )

    act(() => {
      result.current.handleBlur()
    })

    expect(result.current.iconState).toBe('default')
    expect(result.current.inputState).toBe('default')
  })

  it('should set input and icon states to default on focus', () => {
    const { result } = renderHook(() =>
      useInput({
        error,
        keyboardType: 'text',
        isDisabled,
        max,
        mask: 'cpf',
        onChangeText: onChangeTextMock,
      })
    )

    act(() => {
      result.current.handleFocus()
    })

    expect(result.current.iconState).toBe('default')
    expect(result.current.inputState).toBe('default')
  })

  it('should set input and icon states to error if there is an error', () => {
    const { result } = renderHook(() =>
      useInput({
        error: 'error',
        keyboardType: 'numeric',
        isDisabled: false,
        max: 3,
        mask: undefined,
        onChangeText: onChangeTextMock,
      })
    )

    expect(result.current.iconState).toBe('error')
    expect(result.current.inputState).toBe('error')
  })

  it('should not change text if it disabled', () => {
    const { result } = renderHook(() =>
      useInput({
        error,
        keyboardType: 'text',
        isDisabled: true,
        max,
        mask: 'cpf',
        onChangeText: onChangeTextMock,
      })
    )

    const text = 'bla'

    act(() => {
      result.current.handleTextChange(text)
    })

    expect(onChangeTextMock).not.toHaveBeenCalledWith(text)
  })

  it('should change text', () => {
    const { result } = renderHook(() =>
      useInput({
        error,
        keyboardType: 'text',
        isDisabled: false,
        max: 10,
        mask: undefined,
        onChangeText: onChangeTextMock,
      })
    )

    const text = 'bla'

    act(() => {
      result.current.handleTextChange(text)
    })

    expect(onChangeTextMock).toHaveBeenCalledWith(text)
  })

  it('should get only numbers if the type is numeric', () => {
    const { result } = renderHook(() =>
      useInput({
        error,
        keyboardType: 'numeric',
        isDisabled: false,
        max: 3,
        mask: undefined,
        onChangeText: onChangeTextMock,
      })
    )

    const text = 'bla123'

    act(() => {
      result.current.handleTextChange(text)
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('should get only the allowed max numbers if the type is numeric', () => {
    const { result } = renderHook(() =>
      useInput({
        error,
        keyboardType: 'numeric',
        isDisabled: false,
        max: 3,
        mask: undefined,
        onChangeText: onChangeTextMock,
      })
    )

    const text = 'bla123555555555555'

    act(() => {
      result.current.handleTextChange(text)
    })

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })
})
