import { useRef } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'

export function useInformativeHighlights(lastIndex: number) {
  const swiperRef = useRef<SwiperFlatList | null>(null)

  function handlePrev() {
    const currentIndex = swiperRef.current?.getCurrentIndex()

    if (currentIndex) {
      const prevIndex = currentIndex - 1
      swiperRef.current?.scrollToIndex({
        index: prevIndex < 0 ? lastIndex : prevIndex,
      })
    }
  }

  function handleNext() {
    const currentIndex = swiperRef.current?.getCurrentIndex()

    if (currentIndex) {
      const nextIndex = currentIndex + 1
      swiperRef.current?.scrollToIndex({
        index: nextIndex > lastIndex ? 0 : nextIndex,
      })
    }
  }

  return {
    handlePrev,
    handleNext,
    swiperRef,
  }
}
