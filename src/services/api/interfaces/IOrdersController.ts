import type { ProcessedOrder } from '@/@types/ProcessedOrder'

export interface IOrdersController {
  getProcessedOrdersByCustomerDocument(
    document: string,
  ): Promise<ProcessedOrder[]>
}
