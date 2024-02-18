import axios, { AxiosInstance, isAxiosError } from 'axios'
import { IHttp } from '../interfaces/IHttp'

export const AxiosHttpProvider = (): IHttp => {
  let axiosClient: AxiosInstance

  return {
    start() {
      if (!axiosClient) axiosClient = axios.create()
    },

    async get<Response>(url: string) {
      const { data } = await axiosClient.get(url)
      return data as Response
    },
    async post<Request, Response>(url: string, request: Request) {
      const response = await axiosClient.post(url, request)
      return response.data as Response
    },
    async put<Request, Response>(url: string, request: Request) {
      return (await axiosClient.put(url, request)) as Response
    },
    async delete<Response>(url: string) {
      return (await axiosClient.delete(url)) as Response
    },

    getBaseUrl() {
      if (!axiosClient) return ''

      return axiosClient.defaults.baseURL ?? ''
    },

    setBaseUrl(baseUrl: string) {
      if (axiosClient) axiosClient.defaults.baseURL = baseUrl
    },

    setHeader(key: string, value: string) {
      if (axiosClient) axiosClient.defaults.headers[key] = value
    },

    setParams(key: string, value: string) {
      if (axiosClient)
        axiosClient.defaults.params = {
          [key]: value,
        }
    },

    handleError<Error>(error: unknown) {
      if (isAxiosError(error)) {
        console.error(JSON.stringify(error.response, null, 2))

        return error.response?.data as Error
      }

      return error as Error
    },
  }
}
