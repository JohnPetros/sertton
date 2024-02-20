import { Icon as IconProps } from 'phosphor-react-native'
import { useId } from 'react'
import {
  InputProps as FieldProps,
  Spinner,
  Text,
  XStack,
  YStack,
  getTokens,
} from 'tamagui'

import { Label } from '../Label'

import { Field } from './Field'
import { Icon } from './Icon'
import { TEST_IDS } from './tests/constants/test-ids'
import { useInput } from './useInput'

import type { Mask } from '@/@types/Mask'

export interface InputProps extends FieldProps {
  label?: string
  subLabel?: string
  error?: string
  icon?: IconProps
  mask?: Mask
  max?: number
  isLoading?: boolean
}

export function Input({
  icon: InputIcon,
  label,
  placeholder,
  w,
  autoCorrect,
  autoFocus,
  value,
  disabled,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  max,
  mask,
  testID,
  isLoading = false,
  subLabel,
  error,
  onChangeText,
}: InputProps) {
  const { iconState, inputState, handleBlur, handleFocus, handleTextChange, maskText } =
    useInput({
      error,
      keyboardType: keyboardType === 'numeric' ? 'numeric' : 'text',
      mask,
      isDisabled: disabled,
      max,
      onChangeText,
    })
  const id = useId()

  return (
    <YStack gap={3}>
      {label && (
        <Label id={id} subLabel={subLabel}>
          {label}
        </Label>
      )}
      <XStack w={w} gap={4}>
        {InputIcon && (
          <Icon
            state={disabled ? 'disabled' : iconState}
            icon={<InputIcon color={getTokens().color.gray800.val} size={28} />}
          />
        )}
        <Field
          id={id}
          flex={1}
          keyboardType={keyboardType}
          state={disabled ? 'disabled' : inputState}
          placeholder={placeholder}
          value={maskText(value ?? '')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          disabled={disabled}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          testID={testID}
        />
      </XStack>
      {error && (
        <Text color='$red500' fontSize={12}>
          {error}
        </Text>
      )}

      {isLoading && (
        <Spinner
          testID={TEST_IDS.spinner}
          top={40}
          right={12}
          position='absolute'
          color='$blue500'
        />
      )}
    </YStack>
  )
}
