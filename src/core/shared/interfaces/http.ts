import type { RestResponse } from "@/core/shared/responses/rest-response"

export interface HttpSchema {
  readonly body?: unknown
  readonly params?: unknown
  readonly query?: unknown
}

export interface Http<Schema extends HttpSchema = HttpSchema> {
  getBody(): Schema["body"]
  getQueryParams(): Schema["query"]
  getRouteParams(): Schema["params"]
  pass(): Http<Schema>
  send<Body>(response: RestResponse<Body>): RestResponse<Body>
}
