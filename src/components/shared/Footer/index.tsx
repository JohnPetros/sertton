import { XStack, YStack } from 'tamagui'
import { Image } from 'tamagui'

import { CreditCardTypes } from '@/components/shared/CreditCardTypes'
import { SCREEN } from '@/utils/constants/screen'
import { Indentification } from '../Identification'

export function Footer() {
  return (
    <YStack
      bg='$blue500'
      alignItems='center'
      justifyContent='center'
      px={SCREEN.paddingX}
      py={32}
      gap={24}
    >
      <XStack gap={8} flexWrap='wrap' alignItems='center' justifyContent='center'>
        <CreditCardTypes />
      </XStack>
      <Image
        source={require('@/assets/images/payment-security-label.png')}
        resizeMode='contain'
        w={200}
        h={48}
      />
      <Indentification />
    </YStack>
  )
}
