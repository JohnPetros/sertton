import { H1, Paragraph, ScrollView, Text, XStack, YStack } from 'tamagui'

import { BackButton } from '@/components/shared/BackButton'
import { Contacts } from '@/components/shared/Contacts'
import { Indentification } from '@/components/shared/Identification'
import { Logo } from '@/components/shared/Logo'

import { ScreenTitle } from '@/components/shared/ScreenTitle'
import { SCREEN } from '@/utils/constants/screen'

export function About() {
  return (
    <YStack px={SCREEN.paddingX}>
      <BackButton />
      <ScreenTitle>Sobre a Sertton Industrial</ScreenTitle>

      <ScrollView
        // contentContainerStyle={{ paddingBottom: SCREEN.paddingBottom }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={16}>
          <Logo />
          <Paragraph color='$gray800'>
            Nós da Sertton Industrial contamos com profissionais especializados e
            qualificados para prestar um atendimento personalizado e de alta qualidade aos
            nossos clientes.
          </Paragraph>

          <Text color='$gray900' fontSize={16}>
            Atendimento:
          </Text>
          <XStack gap={12} justifyContent='center' flexWrap='wrap'>
            <Contacts />
          </XStack>

          <Indentification />
        </YStack>
      </ScrollView>
    </YStack>
  )
}
