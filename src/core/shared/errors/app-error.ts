import { HTTP_STATUS_CODE } from "@/core/shared/constants/http-status-code"

export class AppError extends Error {
  public readonly statusCode: number

  public constructor(message: string, statusCode: number = HTTP_STATUS_CODE.internalServerError) {
    super(message)
    this.name = "AppError"
    this.statusCode = statusCode
  }
}

export class AuthError extends AppError {
  public constructor(message = "Unauthorized") {
    super(message, HTTP_STATUS_CODE.unauthorized)
    this.name = "AuthError"
  }
}

export class ConflictError extends AppError {
  public constructor(message = "Conflict") {
    super(message, HTTP_STATUS_CODE.conflict)
    this.name = "ConflictError"
  }
}

export class NotAllowedError extends AppError {
  public constructor(message = "Forbidden") {
    super(message, HTTP_STATUS_CODE.forbidden)
    this.name = "NotAllowedError"
  }
}

export class NotFoundError extends AppError {
  public constructor(message = "Not found") {
    super(message, HTTP_STATUS_CODE.notFound)
    this.name = "NotFoundError"
  }
}

export class ValidationError extends AppError {
  public constructor(message = "Validation failed") {
    super(message, HTTP_STATUS_CODE.unprocessableEntity)
    this.name = "ValidationError"
  }
}
