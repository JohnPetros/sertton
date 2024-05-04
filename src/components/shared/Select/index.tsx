import { ForwardedRef, forwardRef, useId, useImperativeHandle } from 'react'
import { ActivityIndicator } from 'react-native'

import { CaretDown, Check, X } from 'phosphor-react-native'

import {
  Adapt,
  Select as S,
  Separator,
  Sheet,
  View,
  XStack,
  YStack,
  getTokens,
} from 'tamagui'
import { Text } from 'tamagui'
import { Label } from 'tamagui'

import { useSelect } from './useSelect'

import { Button } from '@/components/shared/Button'

import { TEST_IDS } from './tests/constants/test-ids'
import { SelectRef } from './types/SelectRef'

type DefaultValue = 'Selecionar'

const DEFAULT_VALUE: DefaultValue = 'Selecionar'

export type SelectProps = {
  items: string[]
  defaultValue: string | DefaultValue
  width: number | string
  onChange: (value: string) => void
  label?: string
  ariaLabel?: string
  isDisabled?: boolean
  hasError?: boolean
}

export const SelectComponent = (
  {
    label,
    ariaLabel,
    items,
    defaultValue,
    width,
    isDisabled = false,
    hasError = false,
    onChange,
  }: SelectProps,
  ref: ForwardedRef<SelectRef>,
) => {
  const {
    open,
    close,
    reset,
    handleChangeValue,
    handleOpenChange,
    isLoading,
    selectedValue,
    isOpen,
    error,
  } = useSelect(defaultValue, onChange, hasError)
  const id = useId()

  useImperativeHandle(ref, () => {
    return {
      value: selectedValue === DEFAULT_VALUE ? '' : selectedValue,
      reset,
      open,
    }
  })

  return (
    <YStack
      testID={TEST_IDS.container}
      aria-label={ariaLabel}
      w={width}
      alignItems='center'
      opacity={isDisabled ? 0.3 : 1}
    >
      {label && id && (
        <Label
          htmlFor={id}
          color='#111'
          fontSize={12}
          textTransform='uppercase'
        >
          {label}
        </Label>
      )}
      <S
        defaultValue={defaultValue}
        onValueChange={handleChangeValue}
        open={isOpen}
        value={selectedValue}
      >
        <S.Trigger
          testID={TEST_IDS.trigger}
          id={id}
          borderWidth={1}
          borderColor={error ? '$red700' : '$gray400'}
          borderRadius={4}
          fontSize={14}
          bg={error ? '$red50' : '$gray50'}
          w={width}
          disabled={isDisabled}
          onStartShouldSetResponder={() => {
            if (!isDisabled) open()
            return true
          }}
        >
          {selectedValue}
          <CaretDown size={16} color={getTokens().color.gray800.val} />
        </S.Trigger>

        <Adapt when='sm' platform='touch'>
          <Sheet
            modal
            animation='quick'
            dismissOnSnapToBottom
            onOpenChange={handleOpenChange}
          >
            <Sheet.Frame flexDirection='column'>
              <Adapt.Contents />
            </Sheet.Frame>
          </Sheet>
        </Adapt>

        <S.Content>
          <S.Viewport>
            <XStack
              testID={TEST_IDS.content}
              disabled={isOpen}
              alignItems='center'
              justifyContent='space-between'
              mb={8}
            >
              <Text p={12} fontSize={16} fontWeight='600' color='$blue800'>
                Selecione uma opção:
              </Text>
              <Button
                testID={TEST_IDS.close}
                background='transparent'
                p={12}
                onPress={close}
              >
                <X color={getTokens().color.blue800.val} />
              </Button>
            </XStack>
            <S.Group
              separator={
                <View px={12}>
                  <Separator
                    bg='$gray400'
                    alignSelf='stretch'
                    vertical={false}
                  />
                </View>
              }
            >
              {items.map((item, index) => (
                <S.Item
                  testID={`${TEST_IDS.item}-${index + 1}`}
                  key={item}
                  index={index}
                  value={item}
                  alignItems='center'
                >
                  <S.ItemText fontSize={14} fontWeight='600'>
                    {item}
                  </S.ItemText>

                  <S.ItemIndicator marginLeft='auto'>
                    {isLoading ? (
                      <ActivityIndicator
                        testID={TEST_IDS.spinner}
                        size='small'
                        color={getTokens().color.blue600.val}
                      />
                    ) : (
                      <Check size={16} color={getTokens().color.blue600.val} />
                    )}
                  </S.ItemIndicator>
                </S.Item>
              ))}
            </S.Group>
          </S.Viewport>
        </S.Content>
      </S>
    </YStack>
  )
}

export const Select = forwardRef(SelectComponent)
