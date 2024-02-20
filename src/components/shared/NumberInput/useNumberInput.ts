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

  function handleDecreaseValue() {
    const updatedNumber = numberValue - 1

    if (updatedNumber >= min) {
      setNumberValue(updatedNumber)
    }
  }

  function handleIncreaseValue() {
    const updatedNumber = numberValue + 1

    if (max && updatedNumber > max) {
      if (onReachMax) onReachMax()
      return
    }

    setNumberValue(updatedNumber)
  }

  useEffect(() => {
    onChangeNumber(numberValue)
  }, [numberValue])

  useEffect(() => {
    onChangeNumber(number)
  }, [number])

  return {
    numberValue,
    handleDecreaseValue,
    handleIncreaseValue,
  }
}
