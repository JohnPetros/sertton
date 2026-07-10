# Core Layer Guidelines

The **Core** layer (`lib/core/`) contains business rules, contracts, and framework-agnostic data structures.

---

## Architectural Principles

### Framework Independence

The Core layer **MUST NOT depend** on Flutter, Riverpod, Dio, or any external library.

### Dependency Direction

```text
UI → REST → Core ← Drivers
         ↘  ↓  ↙
      All layers depend on Core
      Core depends on none
```

### Dependency Inversion (DIP)

Core defines interfaces, other layers implement them:

```dart
// Defined in Core
abstract class CatalogService {
  Future<RestResponse<List<ProductDto>>> fetchProducts();
}

// Implemented in REST
class YampiCatalogService implements CatalogService { ... }
```

---

## Design Patterns

### DTO Pattern

Simple objects for data transfer:

```dart
class ProductDto {
  final String id;
  final String name;
  final List<SkuDto> skus;

  ProductDto({required this.id, required this.name, required this.skus});
}
```

### Interface Segregation

Small, domain-specific interfaces:

```dart
abstract class CatalogService { ... }
abstract class MarketingService { ... }
abstract class CheckoutService { ... }
```

### Result Pattern (`RestResponse`)

Encapsulates success/error:

```dart
class RestResponse<Body> {
  Body get body;
  bool get isSuccessful;
  bool get isFailure;
  String get errorMessage;
  RestResponse<NewBody> mapBody<NewBody>(NewBody? Function(Body) mapper);
}
```

---

## Directory Structure

```text
lib/core/
├── {domain}/
│   ├── dtos/
│   │   └── {entity}_dto.dart
│   └── interfaces/
│       └── {domain}_service.dart
├── global/
│   ├── interfaces/
│   │   ├── rest_client.dart
│   │   ├── env_driver.dart
│   │   └── navigation_driver.dart
│   └── responses/
│       ├── rest_response.dart
│       └── pagination_response.dart
└── constants/
    └── http_status_code.dart
```

---

## Naming Conventions

| Type | File Pattern | Class Pattern |
|------|--------------|---------------|
| DTO | `{entity}_dto.dart` | `{Entity}Dto` |
| Service Interface | `{domain}_service.dart` | `{Domain}Service` |
| Driver Interface | `{name}_driver.dart` | `{Name}Driver` |
| Response | `{name}_response.dart` | `{Name}Response` |

---

## Global Components

### Interfaces

| Interface | Purpose |
|-----------|---------|
| `RestClient` | HTTP contract (GET, POST, PUT, DELETE) |
| `EnvDriver` | Environment variable contract |
| `NavigationDriver` | Navigation contract |

### Responses

| Response | Purpose |
|----------|---------|
| `RestResponse<T>` | HTTP response wrapper |
| `PaginationResponse<T>` | Wrapper for paginated lists |

---

## Best Practices

### ✅ Do

- Use DTOs with `final` fields (immutability).
- Keep interfaces small and domain-specific.
- Use typed generics (`RestResponse<ProductDto>`).
- Use named parameters with `required`.
- Compose DTOs.

### ❌ Avoid

- Framework dependencies.
- Presentation logic inside DTOs.
- Persistence logic in Core.
- Circular imports.
- Nullable fields without need.
