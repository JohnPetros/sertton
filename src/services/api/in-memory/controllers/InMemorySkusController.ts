import { ISkusController } from '../../interfaces/ISkusController'

import { productsMock } from '@/_tests_/mocks/core/productsMock'

export function InMemorySkusController(): ISkusController {
  return {
    async getSkusByProductId(productId: string) {
      const product = productsMock.find(product => product.id === productId)
      return product?.skus ?? []
    },
  }
}
