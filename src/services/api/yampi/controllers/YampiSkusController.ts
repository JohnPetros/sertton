import { YampiSku } from '../types/YampiSku'

import { IHttp } from '../../http/interfaces/IHttp'

import { ISkusController } from '../../interfaces/ISkusController'

import { YampiSkuAdapter } from '../adapters/YampiSkuAdapter'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'

export function YampiSkusController(http: IHttp): ISkusController {
  return {
    async getSkusByProductId(productId: string) {
      const response = await http.get<{ data: YampiSku[] }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.product}/${productId}/${ENDPOINTS.sku}?include=images`
      )
      return response.data.map(YampiSkuAdapter)
    },
  }
}
