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
import { ICommentsController } from './ICommentsController'
import { IAddressesController } from './IAddressesController'

export interface IApi extends
  IAddressesController,
  IBannersController,
  IBrandsController,
  ICategoriesController,
  ICommentsController,
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
