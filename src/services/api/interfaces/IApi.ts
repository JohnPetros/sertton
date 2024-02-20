import { IBannersController } from './IBannersController'
import { ICategoriesController } from './ICategoriesController'
import { ICollectionsController } from './ICollectionsController'
import { ILeadsController } from './ILeadsController'
import { IProductsController } from './IProductsController'

export interface IApi
  extends IBannersController,
  ICollectionsController,
  ICategoriesController,
  IProductsController,
  ILeadsController {
  handleError<Error>(error: unknown): Error
}
