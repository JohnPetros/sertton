import { SCREEN } from '@/utils/constants/screen'
import { ScrollView, YStack } from 'tamagui'

import { Footer } from '@/components/shared/Footer'

import { Marketing } from './Marketing'

export function Home() {
  return (
    <YStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <YStack mt={12} mb={24} gap={24} px={SCREEN.paddingX}>
          <InformativeHighlights />
        </YStack> */}

        <Marketing />
        {/* 
        <YStack mt={40}>
          <LeadsCapture />
        </YStack> */}

        <Footer />
      </ScrollView>
    </YStack>
  )
}
