import { SvgUri } from 'react-native-svg'

import { Text, XStack, YStack } from 'tamagui'

import { Clipboard } from './Clipboard'
import { Heading } from './Heading'
import { Link } from './Link'

import type { PaymentMethod } from '@/@types/Payment'
import { useDate } from '@/services/date'

type PaymentProps = {
  icon: string
  pdf: string | null
  name: string
  method: PaymentMethod
  expirationDate?: Date
}

export function Payment({ icon, pdf, name, method, expirationDate }: PaymentProps) {
  const { format } = useDate()

  return (
    <YStack>
      <Heading>Pagamento</Heading>
      <XStack mt={8} gap={12} flexWrap='wrap'>
        <SvgUri uri={icon} />
        <Text fontWeight='600' fontSize={16}>
          {name}
        </Text>
        {method === 'ticket' && pdf && <Link url={pdf}>Ver boleto</Link>}
        {method === 'pix' && <Clipboard>pix</Clipboard>}
        {expirationDate && <Text>{format(expirationDate, 'DD/MM/YYYY HH:mm')}</Text>}
      </XStack>
    </YStack>
  )
}
