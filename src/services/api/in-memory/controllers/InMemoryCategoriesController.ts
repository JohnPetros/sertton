
import { IBrandsController } from '../../interfaces/IBrandsController'

import { Brand } from '@/@types/Brand'
import { brandsMock } from '@/_tests_/mocks/core/brandsMock'

export function InMemoryCategoriesController(): IBrandsController {
  const brands: Brand[] = brandsMock

  return {
    async getBrands() {
      return brands
    },
  }
}
