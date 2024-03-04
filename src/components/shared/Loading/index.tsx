import LottieView from 'lottie-react-native'
import { Text, YStack } from 'tamagui'

import Truck from '@/assets/animations/truck.json'
import { TEST_IDS } from './tests/test-ids'

type LoadingProps = {
  message: string
  size: number
}

export function Loading({ message, size = 80 }: LoadingProps) {
  return (
    <YStack w='100%' alignItems='center' justifyContent='center'>
      <LottieView
        testID={TEST_IDS.lottie}
        style={{
          width: size,
          height: size,
          zIndex: 150,
        }}
        loop
        resizeMode='contain'
        autoPlay
        source={Truck}
      />
      <Text mt={-48} color='$blue300' fontSize={16} fontWeight='600'>
        {message}
      </Text>
    </YStack>
  )
}
