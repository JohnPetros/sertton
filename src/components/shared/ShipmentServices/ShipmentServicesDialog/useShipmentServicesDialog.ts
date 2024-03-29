import { useState } from 'react'

import type { Address } from '@/@types/Address'
import type { ShipmentService } from '@/@types/ShipmentService'
import { useApi } from '@/services/api'

export function useShipmentServicesDialog(
  zipcode: string,
  shipmentServices: ShipmentService[],
  onOpenChange: (isOpen: boolean) => void,
) {
  const [shipmentServicesNames, setShipmentServicesNames] = useState<string[]>(
    []
  )
  const [address, setAddress] = useState<Pick<
    Address,
    'zipcode' | 'city' | 'uf'
  > | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const api = useApi()

  async function handleDialogOpenChange(isOpen: boolean) {
    onOpenChange(isOpen)

    console.log(shipmentServices)

    if (!isOpen) {
      setIsLoading(true)
      setAddress(null)
      return
    }

    if (isOpen && shipmentServices.length) {

      const shipmentServicesNames: string[] = []

      for (const shipmentService of shipmentServices) {
        shipmentServicesNames.push(shipmentService.name)
      }

      setShipmentServicesNames(shipmentServicesNames)

      const address = await api.getAddressByZipcode(zipcode)

      if (address)
        setAddress({
          zipcode: zipcode,
          city: address.city,
          uf: address.uf,
        })
      else setAddress(null)
    }

    setIsLoading(false)
  }

  return {
    handleDialogOpenChange,
    shipmentServicesNames,
    address,
    isLoading,
  }
}
