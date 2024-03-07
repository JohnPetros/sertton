import { renderHook } from "@/_tests_/customs/customRenderHook"
import { useAccordion } from "../useAccordion"
import { AnimatedRef } from "react-native-reanimated"
import { View } from "react-native"
import { act, waitFor } from "@testing-library/react-native"
import { useSharedValueMock } from "@/_tests_/mocks/libs/react-reanimated/useSharedValueMock"

jest.mock('react-native-reanimated', () => {
  const originalModule = jest.requireActual('react-native-reanimated');
  return {
    ...originalModule,
    runOnUI: jest.fn((callback) => callback),
    withTiming: jest.fn((param) => param),
    measure: jest.fn().mockReturnValueOnce({ height: 100 })
  }
})

describe('useAccordion hook', () => {
  it('should set height to measured content height if current height is zero on toggle', async () => {
    const heightMock = useSharedValueMock(0)
    const isOpenMock = useSharedValueMock(0)

    await waitFor(() => {
      const { result } = renderHook(
        () => useAccordion({} as AnimatedRef<View>, heightMock, isOpenMock)
      )

      act(() => {
        result.current.toggle()
      })

      expect(heightMock.value).toBe(100)
    })
  })

  it('should set height to zero if current height is equal to measured content height on toggle', async () => {
    const heightMock = useSharedValueMock(100)
    const isOpenMock = useSharedValueMock(0)

    await waitFor(() => {
      const { result } = renderHook(
        () => useAccordion({} as AnimatedRef<View>, heightMock, isOpenMock)
      )

      act(() => {
        result.current.toggle()
      })

      expect(heightMock.value).toBe(0)
    })
  })

  it('should set IsOpen to 0 (false) if is open (1) on toggle', async () => {
    const heightMock = useSharedValueMock(100)
    const isOpenMock = useSharedValueMock(1)

    await waitFor(() => {
      const { result } = renderHook(
        () => useAccordion({} as AnimatedRef<View>, heightMock, isOpenMock)
      )

      act(() => {
        result.current.toggle()
      })

      expect(isOpenMock.value).toBe(0)
    })
  })

  it('should set IsOpen to 1 (true) if is not open (0) on toggle', async () => {
    const heightMock = useSharedValueMock(100)
    const isOpenMock = useSharedValueMock(0)

    await waitFor(() => {
      const { result } = renderHook(
        () => useAccordion({} as AnimatedRef<View>, heightMock, isOpenMock)
      )

      act(() => {
        result.current.toggle()
      })

      expect(isOpenMock.value).toBe(1)
    })
  })

})
