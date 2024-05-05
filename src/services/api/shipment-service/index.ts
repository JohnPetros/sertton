import { useMemo } from 'react'

import { Sku } from '@/@types/Sku'

import { ShipmentService } from '@/@types/ShipmentService'

import { IShipmentServiceController } from '../interfaces/IShipmentServicesController'

import { useHttp } from '../http'

const BASE_URL = process.env.EXPO_PUBLIC_SHIPMENT_SERVICE_BASE_URL

export function useShipmentServiceApi(): IShipmentServiceController {
  if (!BASE_URL) throw new Error('Ivalid Shipment Service Base Url')

  const http = useHttp()

  return useMemo(() => {
    http.start()
    http.setBaseUrl(BASE_URL)

    return {
      async getShipmentServices(
        zipcode: string,
        products: (Sku & { quantity: number })[],
      ) {
        const response = await http.post<ShipmentService[]>(
          '/shipment/calculate',
          {
            products,
            zipcode,
          },
        )

        return response
      },
    }
  }, [http])
}
