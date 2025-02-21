import { useEffect, useState } from 'react'

import type { Address } from '@/@types/Address'
import type { ShippingQuote } from '@/@types/ShippingQuote'
import { useApi } from '@/services/api'
import { useToast } from '@/utils/hooks/useToast'

export function useShippingQuotesDialog(
  zipcode: string,
  shippingQuotes: ShippingQuote[],
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

    if (isOpen && shippingQuotes.length) {
      const shippingQuotesNames: string[] = []

      for (const shipmentService of shippingQuotes) {
        shippingQuotesNames.push(shipmentService.name)
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
    if (shippingQuotes.length) handleDialogOpenChange(true)
  }, [shippingQuotes])

  return {
    address,
    isLoading,
    handleDialogOpenChange,
  }
}
