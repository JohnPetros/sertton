import { useMemo } from 'react'

import { useHttp } from '../http'

import { YampiBannersController } from './controllers/YampiBannersController'
import { YampiCollectionsController } from './controllers/YampiCollectionsController'
import { YampiLeadsController } from './controllers/YampiLeadsController'
import { YampiProductsController } from './controllers/YampiProductsController'

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
      ...YampiCollectionsController(http),
      ...YampiProductsController(http),
      ...YampiLeadsController(http),
    }
  }, [http])
}
