import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { ProcessedSku } from '@/@types/ProcessedSku'
// import { useAppError } from '@/components/shared/AppError/useAppError'
import { useApi } from '@/services/api'
import { useToast } from '@/utils/hooks/useToast'
import { useValidation } from '@/services/validation'

export function useShipmentServicesCalculator(sku: ProcessedSku) {
  const [zipcode, setZipcode] = useState('')
  const [shouldCalculate, setShouldCalculate] = useState(false)
  const api = useApi()
  // const { throwAppError } = useAppError()

  const toast = useToast()
  const validation = useValidation()

  async function getShipmentServices() {
    console.log({ zipcode })

    if (!shouldCalculate || !zipcode) {
      toast.show('Cep inválido', 'error')
      return
    }

    const zipcodeValidation = validation.validateZipcode(zipcode)

    console.log({ zipcodeValidation })

    if (!zipcodeValidation.isValid) {
      return
    }

    try {
      return await api.getShipmentServices(zipcode, [sku])
    } catch (error) {
      // throwAppError('Não foi possível calcular frete para esse CEP ' + zipcode)
    }
  }

  const { data: shipmentServices } = useQuery(
    ['shipment-services-costs', sku, zipcode],
    getShipmentServices,
    {
      enabled: shouldCalculate,
    }
  )

  function handleZipcodeChange(zipcode: string) {
    setZipcode(zipcode)
  }

  function handleCalculateShipmentServices() {
    setShouldCalculate(true)
  }

  function handleShipmentServicesDialogOpenChange(isOpen: boolean) {
    setShouldCalculate(isOpen)
  }

  useEffect(() => {
    if (shouldCalculate && shipmentServices) {
      setShouldCalculate(false)
    }
  }, [shouldCalculate, shipmentServices])

  return {
    shipmentServices: shipmentServices ?? [],
    zipcode,
    handleCalculateShipmentServices,
    handleShipmentServicesDialogOpenChange,
    handleZipcodeChange,
  }
}
