import { IBannersController } from './IBannersController'
import { IBrandsController } from './IBrandsController'
import { ICategoriesController } from './ICategoriesController'
import { IDiscountsController } from './IDiscountsController'
import { ICheckoutController } from './ICheckoutController'
import { ICollectionsController } from './ICollectionsController'
import { IShipmentServiceController } from './IShipmentServicesController'
import { ILeadsController } from './ILeadsController'
import { IOrdersController } from './IOrdersController'
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
  IOrdersController,
  IProductsController,
  IShipmentServiceController,
  ISkusController {
  handleError<Error>(error: unknown): Error
}
