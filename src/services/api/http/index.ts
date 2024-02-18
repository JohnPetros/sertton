import { IHttp } from './interfaces/IHttp'

let http: () => IHttp

export function injectHttpProvider(httpProvider: () => IHttp) {
  http = httpProvider
}

export function useHttp() {
  if (!http) {
    throw new Error('useHttp must be used with a http provider')
  }

  return http()
}
