import type { ProcessedOrder } from '@/@types/ProcessedOrder'

export interface IOrdersController {
  getOrdersByCustomerDocument(document: string): Promise<ProcessedOrder[]>
}
