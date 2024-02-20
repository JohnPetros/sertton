import { Separator, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { useDate } from '@/services/date'

export function Indentification() {
  const date = useDate()

  return (
    <YStack gap={8} alignItems='center'>
      <Separator vertical={false} w='90%' bg='$gray200' />
      <Text color='$gray200' fontSize={12}>
        Rua Tomatssu Iawasse 233 - Vila Nova Bonsucesso
      </Text>
      <Text color='$gray200' fontSize={12}>
        © {date.format(new Date(), 'YYYY')} Sertton Brasil Distribuidora Ltda
      </Text>
      <Text color='$gray200' fontSize={12}>
        CNPJ: 33.805.461/0001-90
      </Text>
    </YStack>
  )
}
