import type { z } from "zod"
import type { Http, HttpSchema } from "@/core/shared/interfaces/http"
import type { RestResponse } from "@/core/shared/responses/rest-response"

export type ExpoSchema = HttpSchema
export interface ExpoHttp extends Http<ExpoSchema> {
  sendResponse(response: RestResponse<unknown>): Response
}

export const ExpoHttp = async <Schema extends z.ZodType>(
  request: Request,
  routeParams: Record<string, string | undefined>,
  schema: Schema,
): Promise<Http<z.output<Schema> & ExpoSchema> & ExpoHttp> => {
  const definition = schema as Schema & { shape?: Record<string, z.ZodType> }
  const shape = definition.shape ?? {}
  const body =
    "body" in shape && request.method !== "GET"
      ? await request.json().catch(() => undefined)
      : undefined
  const query =
    "query" in shape ? Object.fromEntries(new URL(request.url).searchParams.entries()) : undefined
  const params = "params" in shape ? routeParams : undefined
  const parsed = await schema.parseAsync({ body, params, query })
  const result = parsed as z.output<Schema> & ExpoSchema
  const http: Http<z.output<Schema> & ExpoSchema> & ExpoHttp = {
    getBody: () => result.body as never,
    getQueryParams: () => result.query as never,
    getRouteParams: () => result.params as never,
    pass: () => http,
    send: <Response>(response: RestResponse<Response>) => response,
    sendResponse: (response) => {
      const headers = new Headers({ "content-type": "application/json" })
      if (response.statusCode === 204)
        return new Response(null, { headers, status: response.statusCode })
      return Response.json(
        response.isSuccessful
          ? response.body
          : { message: response.error?.message ?? "Request failed" },
        { headers, status: response.statusCode },
      )
    },
  }
  return http
}
