import { useCallback } from "react"

export const usePaymentOption = (paymentId: string, onSelect: (paymentId: string) => void) => {
  const select = useCallback(() => onSelect(paymentId), [onSelect, paymentId])

  return { select }
}
