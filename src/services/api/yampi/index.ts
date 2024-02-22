import { useMemo } from 'react'

import { useHttp } from '../http'

import { YampiBannersController } from './controllers/YampiBannersController'
import { YampiBrandsController } from './controllers/YampiBrandsController'
import { YampiCategoriesController } from './controllers/YampiCategoriesController'
import { YampiCheckoutController } from './controllers/YampiCheckoutController'
import { YampiCollectionsController } from './controllers/YampiCollectionsController'
import { YampiDiscountsController } from './controllers/YampiDiscountsController'
import { YampiLeadsController } from './controllers/YampiLeadsController'
import { YampiOrdersController } from './controllers/YampiOrdersController'
import { YampiProductsController } from './controllers/YampiProductsController'
import { YampiSkusController } from './controllers/YampiSkusController'

const BASE_URL = process.env.EXPO_PUBLIC_YAMPI_BASE_URL
const ALIAS = process.env.EXPO_PUBLIC_ALIAS
const TOKEN = process.env.EXPO_PUBLIC_YAMPI_TOKEN
const SECRET_KEY = process.env.EXPO_PUBLIC_YAMPI_SECRET_KEY

export function useYampiApi() {
  if (!BASE_URL || !ALIAS || !TOKEN || !SECRET_KEY) {
    throw new Error('invalid Yampi env vars')
  }

  const http = useHttp()

  return useMemo(() => {
    http.start()
    http.setBaseUrl(`${BASE_URL}/${ALIAS}`)
    http.setHeader('User-Token', TOKEN)
    http.setHeader('User-Secret-Key', SECRET_KEY)

    return {
      ...YampiBannersController(http),
      ...YampiBrandsController(http),
      ...YampiCheckoutController(http),
      ...YampiCategoriesController(http),
      ...YampiCollectionsController(http),
      ...YampiDiscountsController(http),
      ...YampiOrdersController(http),
      ...YampiProductsController(http),
      ...YampiLeadsController(http),
      ...YampiSkusController(http),
    }
  }, [http])
}
