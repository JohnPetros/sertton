import { ReactNode } from 'react'

import { StyledSafeAreaView } from '@/components/shared/StyledSafeAreaView'
import { useNetworkChecker } from './use-network-checker'
import { H1, Paragraph, YStack } from 'tamagui'
import { SCREEN } from '@/utils/constants/screen'

type NetworkCheckerProps = {
  children: ReactNode
}

export function NetworkChecker({ children }: NetworkCheckerProps) {
  const { isNetworkConnected } = useNetworkChecker()

  return isNetworkConnected ? (
    children
  ) : (
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
            🛜 Ops, Parece que você está sem internet
          </H1>
          <Paragraph color='$gray700' textAlign='center'>
            Verifique sua conexão e tente novamente para conferir nossas
            ofertas.
          </Paragraph>
        </YStack>
      </YStack>
    </StyledSafeAreaView>
  )
}
