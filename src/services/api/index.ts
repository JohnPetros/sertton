import { useHttp } from './http'
import { IApi } from './interfaces/IApi'
import { useYampiApi } from './yampi'

export function useApi(): IApi {
  const yampiApi = useYampiApi()
  // const shipmentServiceApi = useShipmentServiceApi()

  const http = useHttp()

  const api = {
    ...yampiApi,
    handleError: <Error>(error: unknown) => http.handleError(error) as Error,
  }

  return api
}
