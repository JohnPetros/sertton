import { SliderRef } from '@/components/shared/Slider/types/SliderRef'
import { RefObject } from 'react'

export function useInformativeHighlights(
  lastIndex: number,
  swiperRef: RefObject<SliderRef>
) {

  function handlePreviousButtonPress() {
    const currentIndex = swiperRef.current?.getCurrentSlideIndex()

    if (currentIndex || currentIndex === 0) {
      const prevIndex = currentIndex - 1
      swiperRef.current?.setSlideIndex(prevIndex < 0 ? lastIndex : prevIndex)
    }
  }

  function handleNextButtonPress() {
    const currentIndex = swiperRef.current?.getCurrentSlideIndex()

    if (currentIndex || currentIndex === 0) {
      const nextIndex = currentIndex + 1
      swiperRef.current?.setSlideIndex(nextIndex > lastIndex ? 0 : nextIndex)
    }
  }

  return {
    handlePreviousButtonPress,
    handleNextButtonPress,
    swiperRef,
  }
}
