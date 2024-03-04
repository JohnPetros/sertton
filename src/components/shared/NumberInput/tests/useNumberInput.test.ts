import { act } from '@testing-library/react-native'

import { useNumberInput } from '../useNumberInput'
import { renderHook } from '@/_tests_/customs/customRenderHook'

const onChangeNumberMock = jest.fn()
const onReachMaxMock = jest.fn()

describe('useNumberInput hook', () => {
  it('should return a default number value', () => {
    const defaulNumber = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 1,
        max: 500,
      })
    )

    expect(result.current.numberValue).toBe(defaulNumber)
  })

  it('should decrease number value', () => {
    const defaulNumber = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 1,
        max: 500,
      })
    )

    act(() => {
      result.current.handleDecreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber - 1)
  })

  it('should update number value state on change number input', () => {
    const defaulNumber = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 1,
        max: 500,
      })
    )

    const newNumberValue = 10

    act(() => {
      result.current.handleInputValueChange(newNumberValue)
    })

    expect(result.current.numberValue).toBe(newNumberValue)
  })

  it('should set number value state to min number if the changed value is less than the min number', () => {
    const defaulNumber = 100
    const min = 10

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min,
        max: 500,
      })
    )

    act(() => {
      result.current.handleInputValueChange(-10)
    })

    expect(result.current.numberValue).toBe(min)
  })

  it('should set number value state to max number if the changed value is greater than the max number', () => {
    const defaulNumber = 100
    const max = 500

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 10,
        max,
      })
    )

    act(() => {
      result.current.handleInputValueChange(max * 2)
    })

    expect(result.current.numberValue).toBe(max)
  })

  it('should not decrease number value when the new number is less than the minimum', () => {
    const defaulNumber = 100
    const min = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: min,
        max: 500,
      })
    )

    act(() => {
      result.current.handleDecreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber)
  })

  it('should increase number value', () => {
    const defaulNumber = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 1,
        max: 500,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber + 1)
  })

  it('should not increase number value when the new number is greater than the maximum', () => {
    const defaulNumber = 100
    const max = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        max: max,
        min: 1,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber)
  })

  it('should call a function on reach max number value', () => {
    const defaulNumber = 100
    const max = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        max: max,
        min: 1,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(onReachMaxMock).toHaveBeenCalled()
  })

  it('should call a function on change number value', () => {
    const defaulNumber = 100
    const max = 500

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        max: max,
        min: 1,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(onChangeNumberMock).toHaveBeenCalled()
  })
})
