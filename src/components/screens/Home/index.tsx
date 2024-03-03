import { ScrollView, YStack } from 'tamagui'

import { LeadsCapture } from './LeadsCapture'
import { Marketing } from './Marketing'

import { Footer } from '@/components/shared/Footer'
import { Header } from '@/components/shared/Header'
import { Search } from '@/components/shared/Search'
import { SCREEN } from '@/utils/constants/screen'
import { InformativeHighlights } from './InformativeHighlights'

export function Home() {
  return (
    <YStack pb={SCREEN.paddingBottom}>
      <YStack px={SCREEN.paddingX} pb={12}>
        <Header />
        <Search />
      </YStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <YStack mt={12} mb={24} gap={24} px={SCREEN.paddingX}>
          <InformativeHighlights />
        </YStack> */}

        <Marketing />

        <YStack mt={40}>
          <LeadsCapture />
        </YStack>

        <Footer />
      </ScrollView>
    </YStack>
  )
}
