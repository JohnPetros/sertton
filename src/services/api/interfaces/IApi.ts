import { IBannersController } from './IBannersController'
import { ICollectionsController } from './ICollectionsController'
import { ILeadsController } from './ILeadsController'
import { IProductsController } from './IProductsController'

export interface IApi
  extends IBannersController,
  ICollectionsController,
  IProductsController,
  ILeadsController {
  handleError<Error>(error: unknown): Error
}
