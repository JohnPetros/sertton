import { productsMock } from '@/_tests_/mocks/core/productsMock'
import { Product } from '@/@types/Product'
import { IProductsController } from '../../interfaces/IProductsController'

export function InMemoryProductsController(): IProductsController {
  const products: Product[] = productsMock

  return {
    async getProducts(params) {
      throw new Error('Method not implemented')
    },

    async getProductBySlug(slug: string) {
      return products.find(product => product.slug === slug) ?? null
    },

    async getProductsByCollectionId(collectionId: string) {
      throw new Error('Method not implemented')
    },

    async getSimiliarProducts(id: string) {
      throw new Error('Method not implemented')
    },
  }
}
