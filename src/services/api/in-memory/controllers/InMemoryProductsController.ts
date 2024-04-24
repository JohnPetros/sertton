import { productsMock } from '@/_tests_/mocks/core/productsMock'
import { Product } from '@/@types/Product'
import {
  IProductsController,
  GetProductsParams,
} from '../../interfaces/IProductsController'

const PER_PAGE = 2

export function InMemoryProductsController(): IProductsController {
  const products: Product[] = productsMock

  return {
    async getProducts({ page }: GetProductsParams) {
      const startIndex = page * PER_PAGE
      return {
        products: products.slice(startIndex, startIndex + PER_PAGE),
        perPage: PER_PAGE,
        totalProductsCount: products.length,
      }
    },

    async getProductBySlug(slug: string) {
      return products.find((product) => product.slug === slug) ?? null
    },

    async getProductsByCollectionId(collectionId: string) {
      throw new Error('Method not implemented')
    },

    async getSimiliarProducts(id: string) {
      throw new Error('Method not implemented')
    },
  }
}
