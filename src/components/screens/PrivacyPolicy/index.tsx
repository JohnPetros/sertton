import { H1, Paragraph, ScrollView, XStack, YStack } from 'tamagui'

import { BackButton } from '@/components/shared/BackButton'
import { Contacts } from '@/components/shared/Contacts'
import { ScreenTitle } from '@/components/shared/ScreenTitle'
import { SCREEN } from '@/utils/constants/screen'

export function PrivacyPolicy() {
  return (
    <YStack px={SCREEN.paddingX}>
      <BackButton />
      <ScreenTitle>Políticas de privacidade</ScreenTitle>

      <ScrollView
        contentContainerStyle={{ paddingBottom: SCREEN.paddingBottom }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={16}>
          <Paragraph color='$gray800'>
            A sua privacidade é de suma importância para nós na Sertton Industrial.
            Estabelecemos esta política com o objetivo de garantir a máxima proteção e
            transparência em relação a todas as informações que possamos coletar, seja em
            nosso site ou em outras plataformas que operamos.
          </Paragraph>
          <Paragraph color='$gray800'>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para
            lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu
            conhecimento e consentimento. Também informamos por que estamos coletando e
            como será usado.
          </Paragraph>
          <Paragraph color='$gray800'>
            Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis
            para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou
            modificação não autorizados. Não compartilhamos informações de identificação
            pessoal publicamente ou com terceiros, exceto quando exigido por lei.
          </Paragraph>
          <Paragraph color='$gray800'>
            Você é livre para recusar a nossa solicitação de informações pessoais,
            entendendo que talvez não possamos fornecer alguns dos serviços desejados.
          </Paragraph>
          <Paragraph color='$gray800'>
            O uso continuado de nosso aplicativo será considerado como aceitação de nossas
            práticas em torno de privacidade e informações pessoais. Se você tiver alguma
            dúvida sobre como lidamos com dados do usuário e informações pessoais, entre
            em contato conosco.
          </Paragraph>
          <XStack gap={8} flexWrap='wrap'>
            <Contacts />
          </XStack>
          <Paragraph color='$gray600' fontSize={14}>
            Esta política é efetiva a partir de 1 de Setembro de 2023 às 10:42.
          </Paragraph>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
