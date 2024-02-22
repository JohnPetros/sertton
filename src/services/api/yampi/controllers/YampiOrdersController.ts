import { IHttp } from '../../http/interfaces/IHttp'
import { YampiProcessedOrderAdapter } from '../adapters/YampiProcessedOrderAdapter'


import { RESOURCES } from '../constants/resources'

import { YampiProcessedOrder } from '../types/YampiProcessedOrder'

import { IOrdersController } from '@/services/api/interfaces/IOrdersController'

export function YampiOrdersController(http: IHttp): IOrdersController {
  return {
    async getOrdersByCustomerDocument(document: string) {
      const response = await http.get<{ data: YampiProcessedOrder[] }>(
        `/${RESOURCES.order}?q=${document}`
      )

      return response.data.map(YampiProcessedOrderAdapter)
    },
  }
}
