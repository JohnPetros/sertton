import { ArrowsOut } from 'phosphor-react-native'
import { View, YStack, getTokens } from 'tamagui'

import { FullImage } from './FullImage'
import { useProductImage } from './useProductImage'

import { Button } from '@/components/shared/Button'
import { Image } from '@/components/shared/Product'
import { SCREEN } from '@/utils/constants/screen'

type FullImageProps = {
  url: string
}

export function ProductImage({ url }: FullImageProps) {
  const { fullImageRef, handleFullImage } = useProductImage()

  return (
    <YStack>
      <FullImage ref={fullImageRef} url={url} />
      <View
        position='relative'
        mt={24}
        onStartShouldSetResponder={() => {
          handleFullImage()
          return true
        }}
      >
        {url && <Image url={url} size='large' width={SCREEN.width} height={280} />}

        <Button position='absolute' zIndex={50} background='transparent' fontSize={12}>
          <ArrowsOut size={16} color={getTokens().color.gray800.val} />
          Pressione para zoom
        </Button>
      </View>
    </YStack>
  )
}
