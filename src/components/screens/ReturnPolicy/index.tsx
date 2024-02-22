import { H1, Paragraph, ScrollView, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { BackButton } from '@/components/shared/BackButton'
import { Contacts } from '@/components/shared/Contacts'
import { ScreenTitle } from '@/components/shared/ScreenTitle'
import { SCREEN } from '@/utils/constants/screen'

export function ReturnPolicy() {
  return (
    <YStack px={SCREEN.paddingX}>
      <BackButton />
      <ScreenTitle>Políticas de devolução</ScreenTitle>

      <ScrollView
        // contentContainerStyle={{ paddingBottom: SCREEN. }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={16}>
          <Paragraph color='$gray800'>
            De acordo com o artigo 49 do Código de Defesa do Consumidor, para devolver um
            produto em caso de arrependimento, o cliente deverá entrar em contato com a
            Sertton Industrial no prazo de até 7 (sete) dias corridos, a contar da data do
            recebimento do pedido. Nesse caso será ressarcido ao cliente o valor total do
            pedido. O frete de retorno será pago pela empresa. O produto deve ser
            devolvido em perfeito estado, sem nenhum sinal de uso e na sua respectiva
            embalagem original.
          </Paragraph>

          <Text>Contato:</Text>
          <XStack gap={8}>
            <Contacts />
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
