import { HTTP_STATUS_CODE } from "@/core/shared/constants/http-status-code"
import { AppError } from "@/core/shared/errors/app-error"

export interface RestResponseProps<Body> {
  readonly body?: Body
  readonly error?: AppError
  readonly statusCode?: number
}

export class RestResponse<Body> {
  public readonly _body?: Body
  public readonly error?: AppError
  public readonly statusCode: number

  public constructor({ body, error, statusCode = HTTP_STATUS_CODE.ok }: RestResponseProps<Body>) {
    this._body = body
    this.error = error
    this.statusCode = statusCode
  }

  public get isFailure(): boolean {
    return !this.isSuccessful
  }

  public get isSuccessful(): boolean {
    return this.error === undefined && this.statusCode >= 200 && this.statusCode < 300
  }

  public get body(): Body {
    if (this.isFailure || this._body === undefined) {
      throw this.error ?? new AppError("Response body is unavailable", this.statusCode)
    }

    return this._body
  }

  public getBody(): Body {
    return this.body
  }

  public mapBody<Result>(mapper: (body: Body) => Result): RestResponse<Result> {
    return this.isSuccessful
      ? new RestResponse({ body: mapper(this.body), statusCode: this.statusCode })
      : new RestResponse({ error: this.error, statusCode: this.statusCode })
  }
}
