import axios, { type AxiosInstance } from "axios"

import { AppError } from "@/core/shared/errors/app-error"
import type { RestClient, RestRequestOptions } from "@/core/shared/interfaces/rest-client"
import { RestResponse } from "@/core/shared/responses/rest-response"

export interface AxiosRestClientOptions {
  readonly baseUrl: string
  readonly headers?: Readonly<Record<string, string>>
  readonly timeout?: number
}

const getErrorMessage = (data: unknown, fallback: string): string => {
  if (typeof data === "object" && data !== null && "message" in data) {
    const message = (data as { message?: unknown }).message
    if (typeof message === "string" && message.trim()) return message
  }

  return fallback
}

export const AxiosRestClient = ({
  baseUrl,
  headers = {},
  timeout = 20_000,
}: AxiosRestClientOptions): RestClient => {
  const client: AxiosInstance = axios.create({ baseURL: baseUrl, headers, timeout })
  const queryParams: Record<string, string | number | boolean> = {}

  const request = async <Response>(
    method: "delete" | "get" | "post" | "put",
    path: string,
    options: RestRequestOptions = {},
  ): Promise<RestResponse<Response>> => {
    const params = { ...queryParams, ...options.query }
    for (const key of Object.keys(queryParams)) delete queryParams[key]

    try {
      const response = await client.request<Response>({
        data: options.body,
        headers: options.headers,
        method,
        params,
        signal: options.signal,
        url: path,
      })
      return new RestResponse({ body: response.data, statusCode: response.status })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status ?? 500
        return new RestResponse({
          error: new AppError(getErrorMessage(error.response?.data, error.message), statusCode),
          statusCode,
        })
      }

      return new RestResponse({ error: new AppError("Unexpected HTTP error"), statusCode: 500 })
    }
  }

  return {
    clearQueryParams: () => {
      for (const key of Object.keys(queryParams)) delete queryParams[key]
    },
    delete: <Response>(path: string, options?: RestRequestOptions) =>
      request<Response>("delete", path, options),
    get: <Response>(path: string, options?: RestRequestOptions) =>
      request<Response>("get", path, options),
    post: <Response>(path: string, options?: RestRequestOptions) =>
      request<Response>("post", path, options),
    put: <Response>(path: string, options?: RestRequestOptions) =>
      request<Response>("put", path, options),
    setQueryParam: (key, value) => {
      if (value !== undefined) queryParams[key] = value
    },
  }
}
