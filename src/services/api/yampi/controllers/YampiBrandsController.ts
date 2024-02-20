import { IHttp } from '../../http/interfaces/IHttp'


import { YampiBrandAdapter } from '../adapters/YampiBrandAdapter'
import { IBrandsController } from '../adapters/YampiBrandsController'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'

import type { YampiBrand } from '../types/YampiBrand'

export const YampiBrandsController = (http: IHttp): IBrandsController => {
  return {
    async getBrands() {
      const response = await http.get<{ data: YampiBrand[] }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.brand}`
      )

      return response.data.map(YampiBrandAdapter)
    },
  }
}
