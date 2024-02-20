import { H2, Spinner, YStack } from 'tamagui'

import { TEST_IDS } from './tests/constants/test-ids'
import { useLeadsCapture } from './useLeadsCapture'

import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { KeyboardHandlerView } from '@/components/shared/KeyboardHandlerView'
import { SCREEN } from '@/utils/constants/screen'

export function LeadsCapture() {
  const { email, error, isLoading, handleEmailChange, handleSubmit } = useLeadsCapture()

  return (
    <KeyboardHandlerView>
      <YStack gap={24} bg='$white' py={32} px={SCREEN.paddingX}>
        <H2 fontSize={24} color='$blue500'>
          Receba novidades e ofertas incríveis
        </H2>
        <Input
          testID={TEST_IDS.input}
          value={email}
          onChangeText={handleEmailChange}
          error={error}
          placeholder='Digite seu e-mail'
        />
        <Button testID={TEST_IDS.button} onPress={handleSubmit}>
          {isLoading ? (
            <Spinner testID={TEST_IDS.spinner} color='$white' />
          ) : (
            'Inscrever-se'
          )}
        </Button>
      </YStack>
    </KeyboardHandlerView>
  )
}
