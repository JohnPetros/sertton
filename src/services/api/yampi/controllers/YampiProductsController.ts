import { Product } from '@/@types/Product'
import { IHttp } from '../../http/interfaces/IHttp'

import { IProductsController } from '../../interfaces/IProductsController'
import { Meta } from '../../types/Meta'

import { YampiProductAdapter } from '../adapters/YampiProductAdapter'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'

import { YampiProduct } from '../types/YampiProduct'

export const YampiProductsController = (http: IHttp): IProductsController => {
  return {
    async getProducts({ page, search, sorter, categoryId, brandsIds }) {
      const sorterParam = sorter
        ? `&orderBy=${sorter.type}&sortedBy=${sorter.order}`
        : ''

      const searchParam = search ? `&search=${search}&searchFields=name` : ''

      const categoryParam = categoryId ? `&category_id[]=${categoryId}` : ''

      const brandsIdsParam = brandsIds.length
        ? `&${brandsIds.map((id) => `brand_id[]=${id}`).join('&')}`
        : ''

      const response = await http.get<{ data: YampiProduct[]; meta: Meta }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.product}?include=images,skus,brand${searchParam}${sorterParam}${categoryParam}${brandsIdsParam}&page=${page}&limit=20`
      )
      const { data, meta } = response

      const products: Product[] = data.map(YampiProductAdapter)
      return {
        products,
        totalPages: meta.pagination.total_pages,
      }
    },

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
