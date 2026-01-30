# Code Style and Conventions

## Naming Conventions
- **Classes:** CamelCase
- **Methods/Fields:** lowerCamelCase
- **Files:** snake_case
- **Barrel Files:** `index.dart` in each feature folder to export public components.

## Patterns
- **MVP (Model-View-Presenter):** Separation between View (widgets) and Presenter (logic).
- **DTO (Data Transfer Object):** For data transfer between layers.
- **Service/Repository:** Abstraction of data access.
- **Adapter/Mapper:** For external data conversion.
- **Result Pattern:** `RestResponse<T>` for handling API responses.

## UI Layer
- Use `ConsumerWidget` or `ConsumerStatefulWidget` for Riverpod.
- Use `signals` for granular reactive state in Presenters.
- Use `shadcn_flutter` components for UI.
