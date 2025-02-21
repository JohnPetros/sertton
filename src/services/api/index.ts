import { useHttp } from './http'
import { IApi } from './interfaces/IApi'
import { useServerlessShippingApi } from './serverless-shipping'
import { useViaCepApi } from './via-cep'
import { useYampiApi } from './yampi'

export function useApi(): IApi {
  const yampiApi = useYampiApi()
  const shipmentServiceApi = useServerlessShippingApi()
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
