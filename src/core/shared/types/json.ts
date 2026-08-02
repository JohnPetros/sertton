export type JsonPrimitive = boolean | null | number | string

export type JsonValue = JsonArray | JsonObject | JsonPrimitive

export interface JsonObject {
  readonly [key: string]: JsonValue
}

export type JsonArray = readonly JsonValue[]
