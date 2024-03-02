import { useEffect, useState } from 'react'

import { NumberInputProps } from './types/NumberInputProps'

export type UseNumberInputParams = Omit<NumberInputProps, 'label'>

export function useNumberInput({
  number,
  min = 1,
  max,
  onChangeNumber,
  onReachMax,
}: UseNumberInputParams) {
  const [numberValue, setNumberValue] = useState(number ?? 1)

  function checkMaxValue(value: number) {
    if (max && value > max) {
      return true
    }

    return false
  }

  function handleInputValueChange(value: number) {
    setNumberValue(value)
  }

  function handleDecreaseValue() {
    const updatedNumber = numberValue - 1

    if (updatedNumber >= min) {
      setNumberValue(updatedNumber)
    }
  }

  function handleIncreaseValue() {
    const updatedNumber = numberValue + 1

    const isOverMax = checkMaxValue(updatedNumber)

    if (isOverMax) {
      if (onReachMax) onReachMax()
      return
    }

    setNumberValue(updatedNumber)
  }


  useEffect(() => {
    if (!numberValue) return

    const isOverMax = checkMaxValue(numberValue)

    if (isOverMax) {
      if (onReachMax) onReachMax()
      if (max) setNumberValue(max)
      return
    }

    onChangeNumber(numberValue)
  }, [numberValue, max])

  useEffect(() => {
    onChangeNumber(number)
  }, [number, onChangeNumber])

  return {
    numberValue,
    handleDecreaseValue,
    handleIncreaseValue,
    handleInputValueChange,
  }
}
