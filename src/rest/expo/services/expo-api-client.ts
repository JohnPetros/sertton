import Constants from "expo-constants"

import { AppError } from "@/core/shared/errors/app-error"
import { RestResponse } from "@/core/shared/responses/rest-response"

const publicBffOrigin = process.env.EXPO_PUBLIC_BFF_ORIGIN?.replace(/\/$/, "") ?? ""
const developmentBffOrigin = (() => {
  if (!__DEV__ || publicBffOrigin) return ""
  const hostUri = Constants.expoConfig?.hostUri
  if (!hostUri) return ""
  return hostUri.startsWith("http://") || hostUri.startsWith("https://")
    ? hostUri
    : `http://${hostUri}`
})()
const endpoint = (path: string): string => `${publicBffOrigin || developmentBffOrigin}${path}`
export const ExpoApiClient = async <Response>(
  path: string,
  options: RequestInit & { readonly signal?: AbortSignal } = {},
): Promise<RestResponse<Response>> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(endpoint(path), {
      ...options,
      headers: {
        accept: "application/json",
        ...(options.body ? { "content-type": "application/json" } : {}),
        ...options.headers,
      },
      signal: options.signal ?? controller.signal,
    })
    const body: unknown =
      response.status === 204 ? undefined : await response.json().catch(() => undefined)
    if (!response.ok)
      return new RestResponse({
        error: new AppError(
          typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof body.message === "string"
            ? body.message
            : "Request failed",
          response.status,
        ),
        statusCode: response.status,
      })
    return new RestResponse({ body: body as Response, statusCode: response.status })
  } catch (error) {
    return new RestResponse({
      error: new AppError(error instanceof Error ? error.message : "Network request failed"),
      statusCode: 500,
    })
  } finally {
    clearTimeout(timeout)
  }
}
const query = (
  values: Readonly<Record<string, string | number | readonly string[] | undefined>>,
): string => {
  const params = new URLSearchParams()
  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) for (const item of value) params.append(key, item)
    else if (value !== undefined) params.set(key, String(value))
  })
  const result = params.toString()
  return result ? `?${result}` : ""
}
export const withQuery = (
  path: string,
  values: Readonly<Record<string, string | number | readonly string[] | undefined>>,
): string => `${path}${query(values)}`
