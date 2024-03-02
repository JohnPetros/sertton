import { Minus, Plus } from 'phosphor-react-native'

import { Input, View, XStack, getTokens } from 'tamagui'

import { useNumberInput } from './useNumberInput'

import { Button } from '@/components/shared/Button'
import { TEST_IDS } from './tests/constants/test-ids'

export type NumberInputProps = {
  label: string
  number: number
  min?: number
  max?: number
  onChangeNumber: (value: number) => void
  onReachMax?: () => void
}

export function NumberInput({
  label,
  number,
  min = 1,
  max,
  onChangeNumber,
  onReachMax,
}: NumberInputProps) {
  const {
    numberValue,
    handleDecreaseValue,
    handleIncreaseValue,
    handleInputValueChange,
  } = useNumberInput({
    number,
    min,
    max,
    onChangeNumber,
    onReachMax,
  })

  return (
    <XStack gap={12} alignItems='center' justifyContent='center'>
      <Button
        testID='decrease-value-button'
        w={24}
        icon={<Minus size={16} color={getTokens().color.white.val} />}
        onPress={handleDecreaseValue}
      />

      <View
        testID={TEST_IDS.inputContainer}
        bg='$gray100'
        borderRadius={4}
        alignItems='center'
        justifyContent='center'
        w={64}
        h={44}
        aria-label={label}
      >
        <Input
          testID={TEST_IDS.input}
          keyboardType='numeric'
          borderRadius={0}
          borderWidth={0}
          borderColor='$red100'
          bg='$colorTransparent'
          textAlign='center'
          w='100%'
          value={numberValue.toString()}
          onChangeText={(value) => handleInputValueChange(Number(value))}
        />
      </View>

      <Button
        testID='increase-value-button'
        w={24}
        icon={<Plus size={16} color={getTokens().color.white.val} />}
        onPress={handleIncreaseValue}
      />
    </XStack>
  )
}
