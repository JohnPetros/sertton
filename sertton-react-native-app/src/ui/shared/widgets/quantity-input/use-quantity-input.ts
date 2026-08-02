import { useCallback } from "react"

interface UseQuantityInputParams {
  readonly max: number
  readonly onChange: (quantity: number) => void
  readonly value: number
}

export const useQuantityInput = ({ max, onChange, value }: UseQuantityInputParams) => {
  const decrement = useCallback(() => onChange(Math.max(1, value - 1)), [onChange, value])
  const increment = useCallback(() => onChange(Math.min(max, value + 1)), [max, onChange, value])

  return {
    decrement,
    increment,
    isDecrementDisabled: value <= 1,
    isIncrementDisabled: value >= max,
  }
}
