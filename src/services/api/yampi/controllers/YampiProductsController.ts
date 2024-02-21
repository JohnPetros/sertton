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

      console.log('meta', meta.pagination.count)

      const products: Product[] = data.map(YampiProductAdapter)

      return {
        products,
        totalProductsCount: meta.pagination.count,
      }
    },

    async getProductsByCollectionId(collectionId: string) {
      const response = await http.get<{ data: YampiProduct[] }>(
        `/catalog/collections/${collectionId}/products?include=images,skus,brand,texts`
      )

      return response.data.map(YampiProductAdapter)
    },

    async getProductBySlug(slug: string) {
      console.log(`/${RESOURCES.catalog}/${ENDPOINTS.product}?include=images,skus,brand,texts&search=${slug}&searchFields=slug`)


      const response = await http.get<{ data: YampiProduct[] }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.collection}?include=images,skus,brand,texts&search=${slug}&searchFields=slug`
      )

      console.log('getProductBySlug', response)

      return YampiProductAdapter(response.data[0])
    },

    async getSimiliarProducts(id: string) {
      const response = await http.get<{ data: YampiProduct[] }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.product}/${id}/${ENDPOINTS.similar}?include=images,skus,brand`
      )

      return response.data.map(YampiProductAdapter)
    },
  }
}
