import { Ref, useImperativeHandle, useRef } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { SliderRef } from './types/SliderRef'
import { ListRenderItem } from 'react-native'

type SliderProps<Item> = {
  data: Item[]
  renderItem: ListRenderItem<Item>
  innerRef: Ref<SliderRef>
}

export function Slider<Item>(
  { data, innerRef, renderItem }: SliderProps<Item>,
) {
  const swiperRef = useRef<SwiperFlatList>(null)

  useImperativeHandle(
    innerRef,
    () => {
      return {
        getCurrentSlideIndex() {
          return swiperRef.current?.getCurrentIndex() ?? 0
        },
        setSlideIndex(index: number) {
          swiperRef.current?.scrollToIndex({
            index,
          })
        },
      }
    },
    []
  )

  return (
    <SwiperFlatList
      ref={swiperRef}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      disableGesture
      autoplayInvertDirection
      data={data}
      renderItem={renderItem}
    />
  )
}
