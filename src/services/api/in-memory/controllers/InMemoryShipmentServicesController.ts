import type { ProcessedSku } from '@/@types/ProcessedSku'
import type { ShipmentService } from '@/@types/ShipmentService'

import { IShipmentServiceController } from '../../interfaces/IShipmentServicesController'

export function InMemoryShipmentServicesController(): IShipmentServiceController {
  const shipmentServices: ShipmentService[] = []

  return {
    async getShipmentServices(
      zipcode: string,
      processedSkus: ProcessedSku[],
    ): Promise<ShipmentService[]> {
      return shipmentServices
    },
  }
}
