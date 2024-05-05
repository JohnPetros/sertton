import { useEffect, useState } from 'react'

import type { Address } from '@/@types/Address'
import type { ShipmentService } from '@/@types/ShipmentService'
import { useApi } from '@/services/api'
import { useToast } from '@/utils/hooks/useToast'

export function useShipmentServicesDialog(
  zipcode: string,
  shipmentServices: ShipmentService[],
  onOpenChange: (isOpen: boolean) => void,
) {
  const [address, setAddress] = useState<Pick<
    Address,
    'zipcode' | 'city' | 'uf'
  > | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const api = useApi()

  async function handleDialogOpenChange(isOpen: boolean) {
    onOpenChange(isOpen)

    if (!isOpen) {
      setIsLoading(true)
      setAddress(null)
      return
    }

    if (!zipcode) {
      setIsLoading(false)
      return
    }

    if (isOpen && shipmentServices.length) {
      const shipmentServicesNames: string[] = []

      for (const shipmentService of shipmentServices) {
        shipmentServicesNames.push(shipmentService.name)
      }

      try {
        const address = await api.getAddressByZipcode(zipcode)

        if (address)
          setAddress({
            zipcode: zipcode,
            city: address.city,
            uf: address.uf,
          })
        else setAddress(null)
      } catch (error) {
        api.handleError(error)
        toast.show(
          `Não foi possível buscar o endereço com esse CEP: ${zipcode}`,
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (shipmentServices.length) handleDialogOpenChange(true)
  }, [shipmentServices])

  return {
    address,
    isLoading,
    handleDialogOpenChange,
  }
}
