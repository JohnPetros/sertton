import { YStack } from 'tamagui'
import { H1 } from 'tamagui'

import { OrdersList } from './OrdersList'

import { Header } from '@/components/shared/Header'
import { SCREEN } from '@/utils/constants/screen'
import { ScreenTitle } from '../ScreenTitle'
import { useRef } from 'react'
import { DialogRef } from '../Dialog/types/DialogRef'

export function Orders() {
  const documentDialogRef = useRef<DialogRef>(null)

  return (
    <YStack flex={1} px={SCREEN.paddingX}>
      <Header />
      <ScreenTitle>Meus pedidos</ScreenTitle>
      <OrdersList documentDialogRef={documentDialogRef} />
    </YStack>
  )
}
