import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { ProcessedSku } from '@/@types/ProcessedSku'
import { useApi } from '@/services/api'
import { useToast } from '@/utils/hooks/useToast'
import { useValidation } from '@/services/validation'
import { CACHE } from '@/utils/constants/cache'
import { useCache } from '@/services/cache'

export function useShipmentServicesCalculator(sku: ProcessedSku) {
  const [zipcode, setZipcode] = useState('')
  const [shouldCalculate, setShouldCalculate] = useState(false)

  const api = useApi()

  const toast = useToast()
  const validation = useValidation()

  async function getShipmentServices() {
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
      return await api.getShipmentServices(zipcode, [sku])
    } catch (error) {
      api.handleError(error)
      toast.show(
        `Não foi possível calcular frete para o CEP ${zipcode}`,
        'error',
      )
    }
  }

  const { data: shipmentServices, refetch } = useCache({
    key: CACHE.keys.shipmentServices,
    fetcher: getShipmentServices,
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

  function handleShipmentServicesDialogOpenChange(isOpen: boolean) {
    setShouldCalculate(isOpen)
  }

  return {
    shipmentServices: shipmentServices ?? [],
    zipcode,
    shouldCalculate,
    handleCalculateShipmentServices,
    handleShipmentServicesDialogOpenChange,
    handleZipcodeChange,
  }
}
