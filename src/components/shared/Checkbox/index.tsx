import { useId } from 'react'

import { Check } from 'phosphor-react-native'

import { Checkbox as Box, Label, XStack, getTokens } from 'tamagui'

import { useCheckbox } from './useCheckbox'

type CheckboxProps = {
  label: string
  value: string
  defaultChecked: boolean
  onChange: (value: string, isChecked: boolean) => void
}

export function Checkbox({ label, value, defaultChecked, onChange }: CheckboxProps) {
  const { isChecked, handleCheckedChange, handleLabelPress } = useCheckbox(
    value,
    defaultChecked,
    onChange
  )
  const id = useId()

  return (
    <XStack alignItems='center' gap={12}>
      <Box
        testID='checkbox'
        id={id}
        borderRadius={4}
        value={value}
        onCheckedChange={handleCheckedChange}
        bg={isChecked ? '$blue400' : '$colorTransparent'}
        size='$5'
        checked={isChecked}
      >
        <Box.Indicator>
          <Check color={getTokens().color.white.val} />
        </Box.Indicator>
      </Box>
      <Label htmlFor={id} onPress={handleLabelPress}>
        {label}
      </Label>
    </XStack>
  )
}
