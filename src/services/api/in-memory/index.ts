import { IApi } from '../interfaces/IApi'

import { InMemoryBannersController } from './controllers/InMemoryBannersController'
import { InMemoryBrandsController } from './controllers/InMemoryBrandsController'
import { InMemoryCategoriesController } from './controllers/InMemoryCategoriesController'
import { InMemoryCollectionsController } from './controllers/InMemoryCollectionsController'
import { InMemoryDiscountsController } from './controllers/InMemoryDiscountsController'
import { InMemoryLeadsController } from './controllers/InMemoryLeadsController'
import { InMemorySkusController } from './controllers/InMemorySkusController'

export function useInMemoryApi(): IApi {
  return {
    ...InMemoryCollectionsController(),
    ...InMemoryBrandsController(),
    ...InMemoryBannersController(),
    ...InMemoryDiscountsController(),
    ...InMemoryLeadsController(),
    ...InMemorySkusController(),
    ...InMemoryCategoriesController(),
  } as IApi
}
