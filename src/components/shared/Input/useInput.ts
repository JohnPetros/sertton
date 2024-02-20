import { useEffect, useState } from 'react'

import { Mask } from '@/@types/Mask'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'
import { useMask } from '@/utils/hooks/useMask'

type InputState = 'default' | 'success' | 'error'
type IconState = 'default' | 'disabled' | 'success' | 'error'

type UseInputParams = {
  mask: Mask | undefined
  isDisabled: boolean | undefined
  keyboardType: 'numeric' | 'text'
  error: string | undefined
  max: number | undefined
  onChangeText: ((value: string) => void) | undefined
}

export function useInput({
  error,
  keyboardType = 'text',
  mask,
  isDisabled,
  max,
  onChangeText,
}: UseInputParams) {
  const [iconState, setIconState] = useState<IconState>('default')
  const [inputState, setInputState] = useState<InputState>('default')
  const maskText = useMask(mask)

  function handleFocus() {
    if (isDisabled || error) return

    setInputState('default')
    setInputState('default')
  }

  function handleBlur() {
    if (isDisabled || error) return

    setIconState('default')
    setInputState('default')
  }

  function handleTextChange(text: string) {
    if (isDisabled) return

    const maskedText = text

    if (onChangeText) {
      const value =
        keyboardType === 'numeric'
          ? getOnlyNumbers(maskedText).slice(0, max)
          : maskedText

      onChangeText(value)
    }

    if (!error) {
      setInputState('default')
      setIconState('default')
    }
  }

  useEffect(() => {
    if (error) {
      setInputState('error')
      setIconState('error')
    }

    if (!error) {
      setInputState('default')
      setIconState('default')
    }
  }, [error])

  return {
    iconState,
    inputState,
    handleFocus,
    handleBlur,
    handleTextChange,
    maskText,
  }
}
