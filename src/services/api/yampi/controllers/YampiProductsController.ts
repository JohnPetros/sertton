import { IHttp } from '../../http/interfaces/IHttp'

import { IProductsController } from '../../interfaces/IProductsController'

import { YampiBannerAdapter } from '../adapters/YampiBannerAdapter'
import { YampiProductAdapter } from '../adapters/YampiProductAdapter'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'

import { YampiProduct } from '../types/YampiProduct'

export const YampiProductsController = (http: IHttp): IProductsController => {
  return {
    async getProductsByCollectionId(collectionId: string) {
      console.log(`/${RESOURCES.catalog}/${ENDPOINTS.product}?include=images,skus,brand&collection_id[]=${collectionId}`)

      const response = await http.get<{ data: YampiProduct[] }>(
        `/catalog/products?collection_id[]=${collectionId}`
      )

      console.log({ response })

      return response.data.map(YampiProductAdapter)
    },
  }
}
