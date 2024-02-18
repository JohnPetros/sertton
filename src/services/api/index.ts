import { useHttp } from './http'
import { IApi } from './interfaces/IApi'
import { useYampi } from './yampi'

export function useApi(): IApi {
  const yampi = useYampi()

  const http = useHttp()

  const api = {
    ...yampi,
    handleError: <Error>(error: unknown) => http.handleError(error) as Error,
  }

  return api
}
