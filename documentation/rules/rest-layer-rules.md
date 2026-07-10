# REST Layer Guidelines

The **REST** layer (`lib/rest/`) implements HTTP communication with external APIs.

---

## Design Patterns

### Adapter Pattern

`DioRestClient` adapts the Dio library to the Core `RestClient` interface:

```dart
class DioRestClient implements RestClient {
  late final Dio _dio;
  // HTTP method implementations
}
```

### Service Pattern

Services implement Core interfaces and encapsulate HTTP calls:

```dart
class YampiCatalogService extends YampiService implements CatalogService {
  @override
  Future<RestResponse<List<ProductDto>>> fetchProducts() async {
    final response = await restClient.get('/catalog/products');
    return response.mapBody((body) => YampiProductMapper.toDtoList(body));
  }
}
```

### Template Method (Base Class)

`YampiService` automatically configures the base URL and headers:

```dart
class YampiService {
  YampiService(this.restClient, this.envDriver) {
    restClient.setBaseUrl(envDriver.get(Env.yampiApiUrl));
    restClient.setHeader('User-Token', envDriver.get(Env.yampiUserToken));
  }
}
```

### Mapper Pattern

Mappers convert JSON into DTOs:

```dart
class YampiProductMapper {
  static ProductDto toDto(Json json) { ... }
  static List<ProductDto> toDtoList(Json json) { ... }
  static PaginationResponse<ProductDto> toDtoPagination(Json json) { ... }
}
```

---

## Technologies

| Library | Purpose |
|------------|---------|
| **dio** | HTTP client |
| **flutter_riverpod** | Dependency injection |
| **flutter_dotenv** | Environment variables |

---

## Directory Structure

```text
lib/rest/
├── rest_client.dart         # RestClient provider
├── services.dart            # Service providers
├── types/
│   ├── json.dart            # typedef Json = Map<String, dynamic>
│   └── query_params.dart
├── dio/
│   └── dio_rest_client.dart
└── {provider}/              # ex: yampi/
    ├── services/
    │   ├── {provider}_service.dart         # Base class
    │   └── {provider}_{domain}_service.dart
    └── mappers/
        └── {provider}_{entity}_mapper.dart
```

---

## Naming Conventions

| Type | File Pattern | Class Pattern |
|------|--------------|---------------|
| Service Base | `{provider}_service.dart` | `{Provider}Service` |
| Service Impl | `{provider}_{domain}_service.dart` | `{Provider}{Domain}Service` |
| Mapper | `{provider}_{entity}_mapper.dart` | `{Provider}{Entity}Mapper` |

### Mapper Methods

| Method | Usage |
|--------|-------|
| `toDto(Json)` | Converts a single object |
| `toDtoList(Json)` | Converts a list |
| `toDtoPagination(Json)` | Converts a paginated response |

---

## Best Practices

### ✅ Do

- Use Core layer interfaces.
- Keep Mapper methods static.
- Handle null safety in Mappers.
- Use `EnvDriver` for configuration.

### ❌ Avoid

- Exposing Dio to other layers.
- Business logic inside Mappers.
- Hardcoded URLs or tokens.
