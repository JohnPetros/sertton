import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useFullImage } from '../useFullImage'
import { act } from '@testing-library/react-native'
import { useSharedValueMock } from '@/_tests_/mocks/libs/react-reanimated/useSharedValueMock'
import { SCREEN } from '@/utils/constants/screen'

describe('useFullImage hook', () => {
  it('should make full image visible', () => {
    const positionXMock = useSharedValueMock(100)

    const { result } = renderHook(() => useFullImage(positionXMock))

    act(() => {
      result.current.open()
    })

    expect(positionXMock.value).toBe(0)
  })

  it('should hide full image', () => {
    const positionXMock = useSharedValueMock(SCREEN.width)

    const { result } = renderHook(() => useFullImage(positionXMock))

    act(() => {
      result.current.open()
    })

    act(() => {
      result.current.close()
    })

    expect(positionXMock.value).toBe(SCREEN.width)
  })
})
