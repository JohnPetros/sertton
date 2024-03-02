import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { ProcessedSku } from '@/@types/ProcessedSku'
// import { useAppError } from '@/components/shared/AppError/useAppError'
import { useApi } from '@/services/api'

export function useShipmentServices(sku: ProcessedSku) {
  const [zipcode, setZipcode] = useState('')
  const [shouldCalculate, setShouldCalculate] = useState(false)
  const api = useApi()
  // const { throwAppError } = useAppError()

  async function getShipmentServices() {
    if (!shouldCalculate || !zipcode) return

    try {
      return await api.getShipmentServices(zipcode, [sku])
    } catch (error) {
      // throwAppError('Não foi possível calcular frete para esse CEP ' + zipcode)
    }
  }

  const { data: shipmentServices } = useQuery(
    ['shipment-services-costs', sku],
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
