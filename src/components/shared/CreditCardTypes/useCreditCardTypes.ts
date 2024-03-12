import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

import type { Payment } from '@/@types/Payment'

export function useCreditCardTypes() {
  const api = useApi()

  function parsePaymentToCreditCardTypes(payment: Payment[]) {
    return payment.filter(
      (paymentConfig) => paymentConfig.isCreditCard && paymentConfig.isActive,
    )
  }

  async function getCreditCardTypes() {
    try {
      const payment = await api.getPayments()

      return parsePaymentToCreditCardTypes(payment)
    } catch (error) {
      api.handleError(error)
    }
  }

  const { data, isLoading } = useQuery('credit-card-types', getCreditCardTypes)

  return {
    creditCardTypes: data,
    isLoading,
    parsePaymentToCreditCardTypes,
  }
}
