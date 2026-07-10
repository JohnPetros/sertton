# Sertton Project Architecture

## Overview

Sertton uses a layered architecture inspired by Clean Architecture to reduce coupling and make testing easier. It is a Flutter/Dart e-commerce app integrated with the Yampi platform.

## Layers

- **UI (`lib/ui/`)**: Widgets, screens, and presenters (MVP). State managed with Riverpod + Signals.
- **Core (`lib/core/`)**: DTOs, interfaces, and response types (for example `RestResponse`).
- **Rest (`lib/rest/`)**: HTTP implementations and external services (Dio + Yampi).
- **Drivers (`lib/drivers/`)**: External infrastructure (for example `.env`).

## Domain Modules

| Module | Focus | Main DTOs |
|--------|------|-----------|
| **Catalog** | Products, SKUs, categories, brands | `ProductDto`, `SkuDto`, `VariationDto`, `CategoryDto`, `BrandDto`, `CollectionDto` |
| **Checkout** | Cart, customer, discounts | `CartItemDto`, `CustomerDto`, `DiscountDto` |
| **Marketing** | Banners and leads | `BannerDto`, `LeadDto`, `ContactDto` |
| **Reviewing** | Reviews | `CommentDto`, `AuthorDto` |

## Dependency Injection

Riverpod centralizes dependency composition: providers for drivers, rest client, services, and routes.

## Data Flow (Summary)

UI (View) -> Presenter -> Provider -> Service Interface -> Yampi Implementation -> RestClient (Dio) -> External API.

## Main Patterns

- **MVP** in the UI to separate View and Presenter.
- **DTO** for data contracts between layers.
- **Adapter** to adapt Dio to `RestClient`.
- **Service/Mapper** to integrate with Yampi and convert external data.

## Architectural Decisions

- Layers guarantee testability and replaceable implementations.
- Riverpod + Signals provide robust DI and fine-grained reactive state.
- Yampi simplifies e-commerce operations through a REST API.

## Pitfalls to Avoid

1. Domain logic outside `core/`.
2. Calling APIs directly from the UI.
3. Circular dependencies between layers.
4. Presenters making direct requests.
5. Mutable DTOs (prefer `final`).

## Tech Stack

| Technology | Package | Purpose |
|------------|--------|---------|
| **Language** | Dart | Main language |
| **Framework** | Flutter | Cross-platform framework |
| **API** | Yampi Dev | E-commerce platform (RESTful) |
| **HTTP Client** | Dio | HTTP requests and interceptors |
| **State & DI** | flutter_riverpod | Dependency injection and global state |
| **Reactivity** | signals / signals_flutter | Fine-grained reactive state |
| **Routing** | go_router | Declarative navigation |
| **UI Kit** | shadcn_flutter | UI components |
| **Animations** | flutter_animate, animate_do, lottie | Micro-interactions and animations |
| **Icons** | font_awesome_flutter | Vector icons |
| **SVG** | flutter_svg | SVG rendering |
| **Env** | flutter_dotenv | Environment variables (`.env`) |
| **Storage** | shared_preferences | Local persistence (key-value) |
| **Formatting** | intl | Internationalization and date/currency formatting |
| **Masks** | mask_text_input_formatter | Input masks (CPF, ZIP code, etc.) |
| **Connectivity** | internet_connection_checker_plus | Network connection checking |
| **URL** | url_launcher | Open external links (WhatsApp, email) |
| **App Info** | package_info_plus | Version and app metadata |
| **Tests** | mocktail, faker, network_image_mock | Mocks and fake data for tests |

## Directory Structure (Essential)

```text
lib/
├── core/
├── rest/
├── drivers/
└── ui/
```
