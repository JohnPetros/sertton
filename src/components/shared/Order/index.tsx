import { YStack } from 'tamagui'
import { H1 } from 'tamagui'

import { OrdersList } from './OrdersList'

import { Header } from '@/components/shared/Header'
import { SCREEN } from '@/utils/constants/screen'
import { ScreenTitle } from '../ScreenTitle'

export function Orders() {
  return (
    <YStack flex={1} px={SCREEN.paddingX}>
      <Header />
      <ScreenTitle>Meus pedidos</ScreenTitle>
      <OrdersList />
    </YStack>
  )
}
