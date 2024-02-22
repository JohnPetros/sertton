import { IBannersController } from './IBannersController'
import { IBrandsController } from './IBrandsController'
import { ICategoriesController } from './ICategoriesController'
import { ICheckoutController } from './ICheckoutController'
import { ICollectionsController } from './ICollectionsController'
import { IDiscountsController } from './IDiscountsController'
import { ILeadsController } from './ILeadsController'
import { IProductsController } from './IProductsController'
import { ISkusController } from './ISkusController'

export interface IApi
  extends IBannersController,
  IBrandsController,
  ICategoriesController,
  ICheckoutController,
  ICollectionsController,
  IDiscountsController,
  ILeadsController,
  IProductsController,
  ISkusController {
  handleError<Error>(error: unknown): Error
}
