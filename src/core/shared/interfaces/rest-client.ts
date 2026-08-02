import type { RestResponse } from "@/core/shared/responses/rest-response"
import type { JsonObject } from "@/core/shared/types/json"

export interface RestRequestOptions {
  readonly body?: JsonObject
  readonly headers?: Readonly<Record<string, string>>
  readonly query?: Readonly<Record<string, string | number | boolean | undefined>>
  readonly signal?: AbortSignal
}

export interface RestClient {
  clearQueryParams(): void
  delete<Response>(path: string, options?: RestRequestOptions): Promise<RestResponse<Response>>
  get<Response>(path: string, options?: RestRequestOptions): Promise<RestResponse<Response>>
  post<Response>(path: string, options?: RestRequestOptions): Promise<RestResponse<Response>>
  put<Response>(path: string, options?: RestRequestOptions): Promise<RestResponse<Response>>
  setQueryParam(key: string, value: string | number | boolean | undefined): void
}

export type IRestClient = RestClient
