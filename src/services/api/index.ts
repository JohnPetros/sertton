import { useHttp } from './http'
import { IApi } from './interfaces/IApi'
import { useShipmentServiceApi } from './shipment-service'
import { useViaCepApi } from './via-cep'
import { useYampiApi } from './yampi'

export function useApi(): IApi {
  const yampiApi = useYampiApi()
  const shipmentServiceApi = useShipmentServiceApi()
  const viaCepApi = useViaCepApi()

  const http = useHttp()

  const api = {
    ...yampiApi,
    ...shipmentServiceApi,
    ...viaCepApi,
    handleError: <Error>(error: unknown) => http.handleError(error) as Error,
  }

  return api
}
