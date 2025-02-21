import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { ProcessedSku } from '@/@types/ProcessedSku'
import { useApi } from '@/services/api'
import { useToast } from '@/utils/hooks/useToast'
import { useValidation } from '@/services/validation'
import { CACHE } from '@/utils/constants/cache'
import { useCache } from '@/services/cache'

export function useShippingQuotesCalculator(sku: ProcessedSku) {
  const [zipcode, setZipcode] = useState('')
  const [shouldCalculate, setShouldCalculate] = useState(false)
  const api = useApi()
  const toast = useToast()
  const validation = useValidation()

  async function getShippingQuotes() {
    if (!shouldCalculate || !zipcode) {
      toast.show('Cep inválido', 'error')
      return
    }

    const zipcodeValidation = validation.validateZipcode(zipcode)

    if (!zipcodeValidation.isValid) {
      toast.show('Cep inválido', 'error')
      return
    }

    try {
      return await api.calculateShippingQuotes(zipcode, [sku])
    } catch (error) {
      // console.error(error)
      api.handleError(error)
      toast.show(
        `Não foi possível calcular frete para o CEP ${zipcode}`,
        'error',
      )
    }
  }

  const { data: shippingQuotes, refetch } = useCache({
    key: CACHE.keys.shippingQuotes,
    fetcher: getShippingQuotes,
    dependencies: [shouldCalculate],
    isEnabled: shouldCalculate,
  })

  function handleZipcodeChange(zipcode: string) {
    setZipcode(zipcode)
  }

  function handleCalculateShipmentServices() {
    if (shouldCalculate) {
      refetch()
      return
    }

    setShouldCalculate(true)
  }

  function handleShippingQuotesDialogOpenChange(isOpen: boolean) {
    setShouldCalculate(isOpen)
  }

  return {
    shippingQuotes: shippingQuotes ?? [],
    zipcode,
    shouldCalculate,
    handleCalculateShipmentServices,
    handleShippingQuotesDialogOpenChange,
    handleZipcodeChange,
  }
}
