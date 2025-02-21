import type { ProcessedSku } from '@/@types/ProcessedSku'
import type { ShipmentService } from '@/@types/ShippingQuote'

import { IShipmentServiceController } from '../../interfaces/ShippingService'

export function InMemoryShipmentServicesController(): IShipmentServiceController {
  const shipmentServices: ShipmentService[] = []

  return {
    async calculateShippingQuotes(
      zipcode: string,
      processedSkus: ProcessedSku[],
    ): Promise<ShipmentService[]> {
      return shipmentServices
    },
  }
}
