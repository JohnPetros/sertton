import { IApi } from '../interfaces/IApi'

import { InMemoryBannersController } from './controllers/InMemoryBannersController'
import { InMemoryBrandsController } from './controllers/InMemoryBrandsController'
import { InMemoryCategoriesController } from './controllers/InMemoryCategoriesController'
import { InMemoryCollectionsController } from './controllers/InMemoryCollectionsController'
import { InMemoryDiscountsController } from './controllers/InMemoryDiscountsController'
import { InMemoryProductsController } from './controllers/InMemoryProductsController'
import { InMemoryLeadsController } from './controllers/InMemoryLeadsController'
import { InMemoryCheckoutController } from './controllers/InMemoryCheckoutUrlController'
import { InMemorySkusController } from './controllers/InMemorySkusController'

export function useInMemoryApi(): IApi {
  return {
    ...InMemoryCollectionsController(),
    ...InMemoryCheckoutController(),
    ...InMemoryBrandsController(),
    ...InMemoryBannersController(),
    ...InMemoryDiscountsController(),
    ...InMemoryLeadsController(),
    ...InMemoryProductsController(),
    ...InMemorySkusController(),
    ...InMemoryCategoriesController(),
  } as IApi
}
