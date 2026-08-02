import type { Http, HttpSchema } from "@/core/shared/interfaces/http"
import type { RestResponse } from "@/core/shared/responses/rest-response"

export interface Controller<Schema extends HttpSchema = HttpSchema> {
  handle(http: Http<Schema>): Promise<RestResponse<unknown>>
}
