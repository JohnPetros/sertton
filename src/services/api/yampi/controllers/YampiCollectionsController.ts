import { IHttp } from '../../http/interfaces/IHttp'

import { ICollectionsController } from '../../interfaces/ICollectionsController'


import { YampiCollectionAdapter } from '../adapters/YampiCollectionAdapter'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'
import { YampiCollection } from '../types/YampiCollection'

export const YampiCollectionsController = (http: IHttp): ICollectionsController => {
  return {
    async getCollections() {
      const response = await http.get<{ data: YampiCollection[] }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.collection}?include=products`
      )

      return response.data.map(YampiCollectionAdapter)
    },
  }
}
