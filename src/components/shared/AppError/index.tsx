import { Anchor, Paragraph } from 'tamagui'
import { H1, YStack } from 'tamagui'

import { Button } from '@/components/shared/Button'
import { StyledSafeAreaView } from '@/components/shared/StyledSafeAreaView'

import { SCREEN } from '@/utils/constants/screen'
import { useAppError } from '@/utils/hooks/useAppError'
import { WHATSAPP_NUMBER } from '@/utils/constants/whatsapp'

type AppErrorProps = {
  error: Error
  resetError: VoidFunction
}

export function AppError({ error, resetError }: AppErrorProps) {
  const { message } = useAppError(error.message)

  return (
    <StyledSafeAreaView>
      <YStack
        flex={1}
        px={SCREEN.paddingX}
        alignItems='center'
        justifyContent='center'
      >
        <YStack
          borderWidth={1}
          borderColor='$red500'
          borderRadius={4}
          p={24}
          w='100%'
          gap={24}
        >
          <H1
            color='$red500'
            fontWeight='600'
            fontSize={32}
            textAlign='center'
            lineHeight={40}
          >
            😢 Ops, temos um problema
          </H1>
          <Paragraph color='$gray700' textAlign='center'>{message}.</Paragraph>
          <Button onPress={resetError}>Tentar novamente</Button>
          <Anchor
            href={`whatsapp://send?phone=${WHATSAPP_NUMBER}&text=Olá, estou tendo um erro no aplicativo.`}
            color='$blue400'
            fontWeight='600'
            textDecorationLine='underline'
            textDecorationStyle='solid'
            textDecorationColor='$blue400'
            fontSize={16}
            textAlign='center'>
            Pedir ajuda
          </Anchor>
        </YStack>
      </YStack>
    </StyledSafeAreaView>
  )
}
