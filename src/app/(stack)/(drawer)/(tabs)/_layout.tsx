import { Tabbar } from '@/components/layout/Tabbar'
import { Header } from '@/components/shared/Header'
import { Search } from '@/components/shared/Search'
import { SCREEN } from '@/utils/constants/screen'
import { YStack } from 'tamagui'

export default function TabsLayout() {
  return (
    <>
      <YStack px={SCREEN.paddingX} pb={12}>
        <Header />
        <Search />
      </YStack>
      <Tabbar />
    </>
  )
}
