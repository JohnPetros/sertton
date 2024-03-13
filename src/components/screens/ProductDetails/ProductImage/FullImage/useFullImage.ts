import { useEffect, useState } from 'react'
import {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

import { SCREEN } from '@/utils/constants/screen'

const ANIMATION_DURATION = 400

export function useFullImage(positionX: SharedValue<number>) {
  const [isVisible, setIsVisible] = useState(false)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(positionX.value, {
            duration: ANIMATION_DURATION,
          }),
        },
      ],
    }
  })

  function open() {
    setIsVisible(true)
  }

  function close() {
    setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible) {
      positionX.value = 0
      return
    }

    positionX.value = SCREEN.width
  }, [positionX, isVisible])

  return {
    animatedStyle,
    open,
    close,
  }
}
