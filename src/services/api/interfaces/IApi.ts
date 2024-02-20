import { IBrandsController } from '../yampi/adapters/YampiBrandsController'
import { IBannersController } from './IBannersController'
import { ICategoriesController } from './ICategoriesController'
import { ICheckoutController } from './ICheckoutController'
import { ICollectionsController } from './ICollectionsController'
import { ILeadsController } from './ILeadsController'
import { IProductsController } from './IProductsController'

export interface IApi
  extends IBannersController,
  IBrandsController,
  ICategoriesController,
  ICheckoutController,
  ICollectionsController,
  IProductsController,
  ILeadsController {
  handleError<Error>(error: unknown): Error
}
