import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'

import Animated, { useSharedValue } from 'react-native-reanimated'

import { X } from 'phosphor-react-native'
import { View, YStack, getTokens } from 'tamagui'

import { useFullImage } from './useFullImage'

import { Button } from '@/components/shared/Button'
import { Image } from '@/components/shared/Product'
import { SCREEN } from '@/utils/constants/screen'
import { Portal } from '@gorhom/portal'
import { FullImageRef } from './types/FullImageRef'

const AnimatedView = Animated.createAnimatedComponent(View)

type FullImageProps = {
  url: string
}

const FullImageComponent = (
  { url }: FullImageProps,
  ref: ForwardedRef<FullImageRef>,
) => {
  const positionX = useSharedValue(0)

  const { animatedStyle, open, close } = useFullImage(positionX)

  useImperativeHandle(ref, () => {
    return {
      open,
      close,
    }
  })

  return (
    <Portal>
      <AnimatedView
        testID='animated-view'
        flex={1}
        top={0}
        left={0}
        right={0}
        bottom={0}
        position='absolute'
        zIndex={100}
        justifyContent='center'
        alignItems='center'
        bg='$gray900'
        style={animatedStyle}
      >
        <YStack
          flex={1}
          position='relative'
          zIndex={1000}
          justifyContent='center'
        >
          <Button
            testID='close-button'
            position='absolute'
            background='transparent'
            top={64}
            right={4}
            onPress={close}
          >
            <X size={40} color={getTokens().color.white.val} />
          </Button>
          <View mt={-100}>
            <Image
              testID='image'
              url={url}
              size='xLarge'
              width={SCREEN.width}
              height={400}
            />
          </View>
        </YStack>
      </AnimatedView>
    </Portal>
  )
}

export const FullImage = forwardRef(FullImageComponent)
