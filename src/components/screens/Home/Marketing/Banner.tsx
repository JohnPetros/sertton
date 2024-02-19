import { Image } from 'tamagui'

import { TEST_IDS } from './tests/constants/test-ids'

import { SCREEN } from '@/utils/constants/screen'

type BannerProps = {
  imageUrl: string
}

export function Banner({ imageUrl }: BannerProps) {
  return (
    <Image
      testID={TEST_IDS.bannerImage}
      source={{
        uri: `https://${imageUrl}`,
      }}
      w={SCREEN.width}
      h={300}
    />
  )
}
