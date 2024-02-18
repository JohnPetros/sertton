import { useMemo } from 'react'

import { useHttp } from '../http'

import { YampiBannersController } from './controllers/YampiBannersController'
import { YampiCollectionsController } from './controllers/YampiCollectionsController'
import { YampiProductsController } from './controllers/YampiProductsController'

const BASE_URL = process.env.YAMPI_BASE_URL

const ALIAS = process.env.ALIAS

const TOKEN = process.env.YAMPI_TOKEN

const SECRET_KEY = process.env.YAMPI_SECRET_KEY

export function useYampi() {
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
      ...YampiCollectionsController(http),
      ...YampiProductsController(http),
    }
  }, [http])
}
