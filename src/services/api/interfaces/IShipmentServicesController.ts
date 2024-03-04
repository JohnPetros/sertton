import type { ProcessedSku } from '@/@types/ProcessedSku'
import type { ShipmentService } from '@/@types/ShipmentService'

export interface IShipmentServiceController {
  getShipmentServices(
    zipcode: string,
    processedSkus: ProcessedSku[]
  ): Promise<ShipmentService[]>
}
