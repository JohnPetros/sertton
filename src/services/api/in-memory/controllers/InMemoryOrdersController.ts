import { processedOrdersMock } from '@/_tests_/mocks/core/processedOrdersMock'
import { IOrdersController } from '../../interfaces/IOrdersController'
import { ProcessedOrder } from '@/@types/ProcessedOrder'

export function InMemoryOrdersController(): IOrdersController {
  const processedOrders: ProcessedOrder[] = processedOrdersMock

  return {
    async getProcessedOrdersByCustomerDocument(
      document: string,
    ): Promise<ProcessedOrder[]> {
      return processedOrders
    },
  }
}
