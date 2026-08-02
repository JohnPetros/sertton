# UI Layer Rules

The UI layer is located in `src/ui`. It renders React Native views and coordinates user interaction through hooks; it must not contain domain or transport logic.

## Screen Structure

```text
src/ui/<domain>/widgets/screens/<screen>/
├── index.tsx
└── use-<screen>.ts
```

- `index.tsx` is declarative presentation only.
- `use-<screen>.ts` owns `useState`, `useEffect`, `useCallback`, service calls, validation, navigation, and event handlers.
- The view destructures the hook result directly: `const { products, refresh } = useCatalogScreen()`.
- Do not assign hook results to `state` and do not create state or business/event functions inside a screen view.

## Widgets

- Apply the same view/hook split to stateful shared widgets.
- `src/ui/reusables` contains generic primitives and is exempt from the hook split when no domain behavior exists.
- Never declare an internal widget in the `index.tsx` file of another widget.
- Create an internal widget in its own folder inside the parent widget, for example `home/product-card/index.tsx`.
- If an internal widget has state, effects, navigation, or event logic, create its hook in the same folder (for example `home/product-card/use-product-card.ts`).
- Views may compose JSX and pass handlers returned by hooks; hooks own the handler implementation.

## Dependencies

- UI depends on `core` contracts and UI-safe providers only.
- Obtain services through `useRestContext`; do not instantiate HTTP clients or Yampi services in a view or hook.
- Never import Axios, Yampi types, or REST mappers into UI.
- Keep domain rules in `core` and HTTP transformations in `rest`.

## Navigation and State

- Navigation actions belong in hooks, not screen views.
- Keep screen-local state in the matching hook.
- Use Zustand stores for shared client state such as the cart.
- Represent loading, empty, and error states explicitly in the hook result.

## Style and Tests

- Use NativeWind `className` and shared widgets before adding one-off styling primitives.
- Keep accessibility label and role props on interactive React Native elements.
- Test hooks for behavior and screen/widget views for rendered states and user interactions.
