import type { ProcessedSku } from '@/@types/ProcessedSku'
import type { ShipmentService } from '@/@types/ShipmentService'

export interface IShipmentServiceController {
  getShipmentServices(
    zipcode: string,
    products: ProcessedSku[]
  ): Promise<ShipmentService[]>
}
