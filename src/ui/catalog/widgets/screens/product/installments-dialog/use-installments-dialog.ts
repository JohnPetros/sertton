import { useCallback, useEffect, useMemo, useState } from "react"

import type { Installment, Payment } from "@/core/checkout/entities"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

interface UseInstallmentsDialogParams {
  readonly isOpen: boolean
  readonly productId: string
  readonly productPrice: number
}

export const useInstallmentsDialog = ({
  isOpen,
  productId,
  productPrice,
}: UseInstallmentsDialogParams) => {
  const { checkoutService } = useRestContext()
  const [payments, setPayments] = useState<readonly Payment[]>([])
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>()
  const [installments, setInstallments] = useState<readonly Installment[]>([])
  const [isPaymentSelectorOpen, setIsPaymentSelectorOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const selectedPayment = useMemo(
    () => payments.find((payment) => payment.id === selectedPaymentId),
    [payments, selectedPaymentId],
  )

  const loadInstallments = useCallback(
    async (paymentId: string) => {
      setIsLoading(true)
      setError(undefined)
      const response = await checkoutService.fetchInstallments(paymentId, productId, productPrice)
      if (response.isSuccessful) setInstallments(response.getBody())
      else setError("Não foi possível carregar as opções de parcelamento.")
      setIsLoading(false)
    },
    [checkoutService, productId, productPrice],
  )

  const selectPayment = useCallback(
    (paymentId: string) => {
      setSelectedPaymentId(paymentId)
      setIsPaymentSelectorOpen(false)
      void loadInstallments(paymentId)
    },
    [loadInstallments],
  )

  useEffect(() => {
    if (!isOpen || payments.length) return

    const loadPayments = async () => {
      setIsLoading(true)
      setError(undefined)
      const response = await checkoutService.fetchPayments()
      if (response.isSuccessful) {
        const availablePayments = response.getBody()
        setPayments(availablePayments)
        if (availablePayments[0]) selectPayment(availablePayments[0].id)
      } else {
        setError("Não foi possível carregar as formas de pagamento.")
        setIsLoading(false)
      }
    }

    void loadPayments()
  }, [checkoutService, isOpen, payments.length, selectPayment])

  const togglePaymentSelector = useCallback(() => setIsPaymentSelectorOpen((isOpen) => !isOpen), [])

  return {
    error,
    installments,
    isLoading,
    isPaymentSelectorOpen,
    payments,
    selectPayment,
    selectedPayment,
    togglePaymentSelector,
  }
}
