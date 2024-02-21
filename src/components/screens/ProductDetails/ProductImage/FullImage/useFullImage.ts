import { useEffect, useState } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { SCREEN } from '@/utils/constants/screen'

const ANIMATION_DURATION = 400

export function useFullImage() {
  const [isVisible, setIsVisible] = useState(false)

  const positionX = useSharedValue(SCREEN.width)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
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
      positionX.value = withTiming(0, { duration: ANIMATION_DURATION })
      return
    }

    positionX.value = withTiming(SCREEN.width, { duration: ANIMATION_DURATION })
  }, [positionX, isVisible])

  return {
    animatedStyle,
    open,
    close,
  }
}
