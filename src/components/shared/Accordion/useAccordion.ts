import { View } from 'react-native'
import {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  measure,
  runOnUI,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { getTokens } from 'tamagui'

const ANIMATION_DURATION = 400

export function useAccordion(
  contentAnimatedRef: AnimatedRef<View>,
  height: SharedValue<number>,
  isOpen: SharedValue<number>
) {

  const closedColor = getTokens().color.gray100.val
  const openColor = getTokens().color.white.val

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        withTiming(isOpen.value, {
          duration: ANIMATION_DURATION,
        }),
        [1, 0],
        [openColor, closedColor]
      ),
    }
  })

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: ANIMATION_DURATION }),
      overflow: 'hidden',
    }
  })

  function toggle() {
    runOnUI(() => {
      const measuredHeight = measure(contentAnimatedRef)?.height ?? 0
      height.value = !height.value ? Number(measuredHeight) : 0
    })()

    isOpen.value = isOpen.value === 0 ? 1 : 0
  }

  return {
    contentAnimatedStyle,
    containerAnimatedStyle,
    toggle,
  }
}
