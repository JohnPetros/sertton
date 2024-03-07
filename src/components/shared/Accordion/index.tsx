import { ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import { CaretDown } from 'phosphor-react-native'
import { Text, XStack, YStack, getTokens } from 'tamagui'

import { useAccordion } from '@/components/shared/Accordion/useAccordion'
import { Button } from '../Button'

const AnimatedYStack = Animated.createAnimatedComponent(YStack)

const PADDING_X = 24

type AccordionProps = {
  label: ReactNode
  children: ReactNode
}

export function Accordion({ children, label }: AccordionProps) {
  const contentAnimatedRef = useAnimatedRef<View>()
  const height = useSharedValue(0)
  const isOpen = useSharedValue(0)

  const {
    contentAnimatedStyle,
    containerAnimatedStyle,
    toggle
  } = useAccordion(contentAnimatedRef, height, isOpen)

  return (
    <AnimatedYStack
      testID="animated-container"
      style={containerAnimatedStyle}
      borderRadius={4}
      px={PADDING_X}
      py={12}
      w='100%'
    >
      <XStack justifyContent='space-between' alignItems='center'>
        <Text color='$gray800'>{label}</Text>

        <Button background='transparent' onPress={toggle}>
          <CaretDown color={getTokens().color.gray400.val} size={PADDING_X} />
        </Button>
      </XStack>
      <Animated.View testID="animated-content" style={contentAnimatedStyle}>
        <YStack position='absolute' top={0} left={0}>
          <View ref={contentAnimatedRef} collapsable={false}>
            {children}
          </View>
        </YStack>
      </Animated.View>
    </AnimatedYStack>
  )
}
