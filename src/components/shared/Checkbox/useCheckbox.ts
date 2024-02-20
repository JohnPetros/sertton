import { useState } from 'react'

export function useCheckbox(
  value: string,
  defaultChecked: boolean,
  onChange: (value: string, isChecked: boolean) => void
) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  function handleCheckedChange(isChecked: boolean) {
    setIsChecked(isChecked)
    onChange(value, isChecked)
  }

  function handleLabelPress() {
    setIsChecked(!isChecked)
    onChange(value, !isChecked)
  }

  return {
    isChecked,
    handleLabelPress,
    handleCheckedChange,
  }
}
