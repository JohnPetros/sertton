import { ZodError, type z } from "zod"

import { AppError } from "@/core/shared/errors/app-error"
import type { Controller } from "@/core/shared/interfaces/controller"
import type { HttpSchema } from "@/core/shared/interfaces/http"
import { ExpoHttp } from "@/rest/expo/expo-http"

export const ExpoRoute =
  <Schema extends z.ZodType<unknown, unknown>, ControllerSchema extends HttpSchema>(
    schema: Schema,
    controller: Controller<ControllerSchema>,
    getFallbackParams?: (request: Request) => Record<string, string | undefined>,
  ) =>
  async (request: Request, context: { params?: Promise<Record<string, string | undefined>> }) => {
    try {
      const contextParams = (await context.params) ?? {}
      const routeParams =
        Object.keys(contextParams).length > 0 ? contextParams : (getFallbackParams?.(request) ?? {})
      const http = await ExpoHttp(request, routeParams, schema)
      return http.sendResponse(await controller.handle(http as never))
    } catch (error) {
      if (error instanceof ZodError)
        return Response.json(
          {
            message: "Invalid request",
            issues: error.issues.map(({ path, message }) => ({ message, path })),
          },
          { status: 422 },
        )
      const appError = error instanceof AppError ? error : new AppError("Unexpected server error")
      console.error("[api-route]", { message: appError.message, statusCode: appError.statusCode })
      return Response.json({ message: appError.message }, { status: appError.statusCode })
    }
  }
