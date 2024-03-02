import { act } from '@testing-library/react-native'

import { useTimer } from '../useTimer'
import { renderHook } from '@/_tests_/customs/customRenderHook'

jest.useFakeTimers()

describe('useTimer hooks', () => {
  it('should set timer seconds and animated hours minutes and seconds on first render', () => {
    const initialHours = 1
    const initialMinutes = 30
    const initialSeconds = 0

    const { result } = renderHook(() =>
      useTimer({ initialHours, initialMinutes, initialSeconds })
    )

    // 1.5 hour = 5400 seconds
    expect(result.current.timerSeconds).toBe(5400)
  })

  it('should set animated hours minutes and seconds on first render', () => {
    const initialHours = 1
    const initialMinutes = 30
    const initialSeconds = 0

    const { result } = renderHook(() =>
      useTimer({ initialHours, initialMinutes, initialSeconds })
    )

    expect(result.current.animatedHoursText.value).toBe('01')
    expect(result.current.animatedMinutesText.value).toBe('30')
    expect(result.current.animatedSecondsText.value).toBe('00')
  })

  it('should decrease timer seconds each second', () => {
    const initialHours = 2
    const initialMinutes = 0
    const initialSeconds = 0

    const { result } = renderHook(() =>
      useTimer({ initialHours, initialMinutes, initialSeconds })
    )

    const currentSeconds = result.current.timerSeconds

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(result.current.timerSeconds).toBe(currentSeconds - 1)
  })
})
