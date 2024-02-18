import { IBannersController } from './IBannersController'
import { ICollectionsController } from './ICollectionsController'
import { IProductsController } from './IProductsController'

export interface IApi
  extends IBannersController,
    ICollectionsController,
    IProductsController {
  handleError<Error>(error: unknown): Error
}
