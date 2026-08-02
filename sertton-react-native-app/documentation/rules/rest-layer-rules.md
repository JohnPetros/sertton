# REST Layer Rules

The REST layer (`src/rest`) isolates HTTP transport, Yampi payloads, mapping, and controller orchestration from the UI and domain.

## Services

- Services implement the interfaces declared in `src/core/<domain>/interfaces`.
- Service methods are async object methods and await the HTTP operation before returning.

```ts
async fetchCollections() {
  const response = await restClient.get<YampiResponse<YampiCollection>>("/catalog/collections")
  return response.mapBody((body) => body.data.map(collectionMapper.toDomain))
}
```

- Do not expose Axios or raw Yampi objects outside `rest`.
- Do not accept `AbortSignal` in service contracts or service methods.
- Query parameters are configured through `RestClient`; request-specific transport options remain inside the REST layer.

## Yampi Types and Mappers

- Place each Yampi entity in its own file under `src/rest/yampi/types` and re-export it through `index.ts`.
- Model API fields explicitly. Do not use generic JSON conversion helpers such as `asString`, `asNumber`, or `asObject`.
- A mapper is a factory function that returns an object.

```ts
export const YampiCollectionMapper = () => ({
  toDomain(input: YampiCollection): Collection {
    return { id: String(input.id), name: input.name }
  },
})
```

- Every mapper provides at least `toDomain(yampiEntity): DomainEntity`.
- Name reverse conversions `toYampi(domainEntity): YampiEntity`.
- Mappers do not use interfaces and do not contain service, UI, or business orchestration.

## Controllers

- Controllers do not use `createController` or callback shorthand.
- Define a local schema and return an object exposing `async handle(http)`.

```ts
type Schema = { params: { collectionId: string } }

export const FetchProductsByCollectionController = (service: ICatalogService) => ({
  async handle(http: Http<Schema>) {
    const { collectionId } = http.getRouteParams()
    const response = await service.fetchProductsByCollection(collectionId)
    return http.send(response)
  },
})
```

## Responses and Errors

- Return `RestResponse` from services and controllers.
- Use `mapBody` only to map a successful response body to a domain value.
- Preserve the status code and error when propagating a failed response.
- Do not throw for expected HTTP failures; transport clients must return a failed `RestResponse`.
