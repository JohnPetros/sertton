import { renderHook } from "@/_tests_/customs/customRenderHook"
import { useInformativeHighlights } from "../useInformativeHighlights"
import { useRefMock } from "@/_tests_/mocks/libs/react/useRefMock"
import { SliderRef } from "@/components/shared/Slider/types/SliderRef"

const setSlideIndexMock = jest.fn()

describe('useInformativeHighlights hook', () => {
  it('should go to the previous slide index if it the previous slide index is greater than zero', () => {
    const lastIndex = 10
    const currentIndex = 5

    const sliderRef = useRefMock<SliderRef>(
      {
        getCurrentSlideIndex: () => currentIndex,
        setSlideIndex: setSlideIndexMock,
      }
    )

    const { result } = renderHook(() => useInformativeHighlights(lastIndex, sliderRef))

    result.current.handlePreviousButtonPress()

    expect(setSlideIndexMock).toHaveBeenCalledWith(currentIndex - 1)
  })

  it('should go to the last slide index if it the previous slide index is less than zero', () => {
    const lastIndex = 10
    const currentIndex = 0

    const sliderRef = useRefMock<SliderRef>(
      {
        getCurrentSlideIndex: () => currentIndex,
        setSlideIndex: setSlideIndexMock,
      }
    )

    const { result } = renderHook(() => useInformativeHighlights(lastIndex, sliderRef))

    result.current.handlePreviousButtonPress()

    expect(setSlideIndexMock).toHaveBeenCalledWith(lastIndex)
  })

  it('should go to the next slide index if the next slide index is less than the last slide index', () => {
    const lastIndex = 10
    const currentIndex = 5

    const sliderRef = useRefMock<SliderRef>(
      {
        getCurrentSlideIndex: () => currentIndex,
        setSlideIndex: setSlideIndexMock,
      }
    )

    const { result } = renderHook(() => useInformativeHighlights(lastIndex, sliderRef))

    result.current.handleNextButtonPress()

    expect(setSlideIndexMock).toHaveBeenCalledWith(currentIndex + 1)
  })

  it('should go to the first slide index if the next slide index is greater than the last slide index',
    () => {
      const lastIndex = 10

      const sliderRef = useRefMock<SliderRef>(
        {
          getCurrentSlideIndex: () => lastIndex,
          setSlideIndex: setSlideIndexMock,
        }
      )

      const { result } = renderHook(() => useInformativeHighlights(lastIndex, sliderRef))

      result.current.handleNextButtonPress()

      expect(setSlideIndexMock).toHaveBeenCalledWith(0)
    })
})
