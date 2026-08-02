import { type ReactNode, useEffect, useState } from "react"
import { Modal, type ModalProps, type StyleProp, type ViewStyle } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { cn } from "@/ui/reusables/utils"

const EXIT_DURATION = 300

interface AnimatedModalProps extends Omit<ModalProps, "animationType" | "children" | "visible"> {
  readonly backdropClassName?: string
  readonly backdropStyle?: StyleProp<ViewStyle>
  readonly children: ReactNode
  readonly contentClassName?: string
  readonly contentStyle?: StyleProp<ViewStyle>
  readonly visible: boolean
}

export const AnimatedModal = ({
  backdropClassName,
  backdropStyle,
  children,
  contentClassName,
  contentStyle,
  visible,
  ...modalProps
}: AnimatedModalProps) => {
  const [isMounted, setIsMounted] = useState(visible)
  const [isContentVisible, setIsContentVisible] = useState(visible)

  useEffect(() => {
    if (visible) {
      setIsMounted(true)
      setIsContentVisible(true)
      return
    }

    if (!isMounted) return

    setIsContentVisible(false)
    const timeout = setTimeout(() => setIsMounted(false), EXIT_DURATION)

    return () => clearTimeout(timeout)
  }, [isMounted, visible])

  return (
    <Modal animationType="none" transparent visible={isMounted} {...modalProps}>
      {isContentVisible ? (
        <Animated.View
          className={cn("flex-1", backdropClassName)}
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(EXIT_DURATION)}
          style={backdropStyle}
        >
          <Animated.View
            className={contentClassName}
            entering={FadeIn.duration(180)}
            exiting={FadeOut.duration(EXIT_DURATION)}
            style={contentStyle}
          >
            {children}
          </Animated.View>
        </Animated.View>
      ) : null}
    </Modal>
  )
}
