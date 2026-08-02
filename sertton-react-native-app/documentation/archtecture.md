# Sertton React Native Architecture

## Overview

Sertton is an Expo/React Native application written in TypeScript. It follows a layered architecture inspired by Clean Architecture: domain contracts live in `src/core`, infrastructure and API integrations live in `src/rest` and `src/providers`, and React Native presentation lives in `src/ui`.

## Layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| App | `src/app` | Expo Router routes and route composition. |
| UI | `src/ui` | Screens, widgets, hooks, local UI orchestration, and stores. |
| Core | `src/core` | Entities, service contracts, shared interfaces, errors, and responses. |
| REST | `src/rest` | HTTP clients, controllers, Yampi services, Yampi types, and mappers. |
| Providers | `src/providers` | Platform and third-party adapters such as links, connectivity, and persistence. |

## Dependency Direction

```text
app -> ui -> core
          -> rest -> core
          -> providers -> core
```

`core` must not depend on React, Expo, Axios, Yampi, or a platform API. The UI consumes services through the REST context; it never accesses Axios or Yampi directly.

## Main Data Flow

```text
Screen view -> screen hook -> service contract -> Yampi/Expo service -> RestClient -> API
API response -> Yampi type -> mapper -> domain entity -> RestResponse -> hook -> view
```

For server/API routes, the flow is:

```text
route -> controller.handle(http) -> service -> RestResponse -> http.send(response)
```

## UI Composition

- `src/ui/<domain>/widgets/screens/<screen>/index.tsx` is the visual view.
- `use-<screen>.ts` owns state, effects, event handlers, navigation, and service calls.
- Views destructure hook results directly; they do not retain a `state` object.
- `src/ui/reusables` is intentionally exempt from the screen-hook rule because it contains generic visual primitives.

## REST Composition

- `RestClient` is the HTTP abstraction in `core`.
- Axios and Expo clients implement transport concerns only.
- Each Yampi entity has a type file under `src/rest/yampi/types`.
- Each mapper is a factory that returns an object with `toDomain` (and, when needed, another explicit conversion such as `toYampi` or `toPagination`).
- Services instantiate their mappers once and expose `async` object methods.
- Controllers define a local `Schema` and return an object with `async handle(http)`.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Expo Router | File-based navigation and route handlers. |
| React Native | Native UI runtime. |
| TypeScript | Static contracts across all layers. |
| Axios | Server-side Yampi REST transport. |
| Zustand | Cart state and persistence integration. |
| NativeWind | Styling through `className`. |
| Jest + Testing Library | Unit and widget tests. |
| Biome | Formatting and static checks. |

## Verification

Run the affected checks before delivery:

```bash
npm run typecheck
npm run codecheck
npm test -- --runInBand
```
