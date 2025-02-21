import { useMemo } from 'react'

import { Sku } from '@/@types/Sku'

import { useHttp } from '../http'
import { ShippingService } from '../interfaces/ShippingService'
import { ShippingQuote } from '@/@types/ShippingQuote'

const BASE_URL = process.env.EXPO_PUBLIC_SHIPMENT_SERVICE_BASE_URL

export function useServerlessShippingApi(): ShippingService {
  if (!BASE_URL) throw new Error('Ivalid Shipment Service Base Url')

  const http = useHttp()

  return useMemo(() => {
    http.start()
    http.setBaseUrl(BASE_URL)

    return {
      async calculateShippingQuotes(
        zipcode: string,
        products: (Sku & { quantity: number })[],
      ) {
        const response = await http.post<ShippingQuote[]>('/shipping/quotes', {
          products: products.map((product) => ({
            quantity: product.quantity,
            price: product.costPrice,
            length: product.length,
            width: product.width,
            height: product.height,
            weight: product.weight,
          })),
          zipcode,
        })

        return response
      },
    }
  }, [http])
}
