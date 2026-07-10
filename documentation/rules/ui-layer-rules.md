# UI Layer Guidelines

The **UI** layer (`lib/ui/`) is responsible for visual presentation and user interaction.

---

## Design Patterns

### MVP (Model-View-Presenter)

| Component | Responsibility | Suffix |
|------------|----------------|--------|
| **View** | Visual rendering, receives user events | `*_view.dart` |
| **Presenter** | State logic, orchestration, service calls | `*_presenter.dart` |

```dart
// Presenter
class ProductsListPresenter {
  final CatalogService _catalogService;
  late final products = futureSignal(() => _catalogService.fetchProducts());

  ProductsListPresenter(this._catalogService);
}

// View
class ProductListView extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.watch(presenterProvider);
    // render using presenter.products
  }
}
```

### Barrel Pattern (Index Files)

Each component exposes an `index.dart` with a public `typedef`:

```dart
// index.dart
import 'catalog_screen_view.dart';
typedef CatalogScreen = CatalogScreenView;
```

### Internal Widgets

- If you need to create an internal widget, create a folder for it inside the larger widget's folder. Do not create a `widgets` or `components` folder inside the parent widget.
- Internal widgets must also follow the MVP (Model-View-Presenter) pattern.

### Signals (Reactive State)

| Type | Usage |
|------|-------|
| `signal<T>` | Simple synchronous state |
| `futureSignal<T>` | Asynchronous state (`Future`) |
| `computed<T>` | Derived state |

---

## Technologies

| Library | Purpose |
|------------|---------|
| **flutter_riverpod** | Dependency injection and providers |
| **signals** | Fine-grained reactive state management |
| **shadcn_flutter** | UI kit with modern components |
| **go_router** | Declarative navigation |

---

## Directory Structure

```text
lib/ui/
└── {module}/
    └── widgets/
        ├── screens/
        │   └── {screen}/
        │       ├── {screen}_screen_view.dart
        │       ├── {screen}_screen_presenter.dart (optional)
        │       ├── index.dart
        │       └── {component}/
        │           ├── {component}_view.dart
        │           ├── {component}_presenter.dart
        │           └── index.dart
        └── components/  (reusable widgets)
```

---

## Naming Conventions

| Type | File Pattern | Class Pattern |
|------|--------------|---------------|
| View | `{name}_view.dart` | `{Name}View` |
| Screen | `{screen}_screen_view.dart` | `{Screen}ScreenView` |
| Presenter | `{name}_presenter.dart` | `{Name}Presenter` |
| Export | `index.dart` | `typedef {Name} = {Name}View` |

---

## Widget Types

| Type | Base Class | Usage |
|------|------------|-------|
| **Screen** | `ConsumerWidget` or `StatelessWidget` | Full screen (route) |
| **Layout** | `StatelessWidget` | Navigation shell |
| **Component** | `ConsumerWidget` | Reusable stateful widget |

---

## Best Practices

### ✅ Do

- Every widget must follow the MVP (Model-View-Presenter) pattern.
- If a widget only contains visual code, it should contain only the View and `index.dart`.
- Separate View from Presenter.
- Use Signals for local state.
- Use `ConsumerWidget` to access providers.
- Create `index.dart` files for exports.
- Break complex widgets into components.
- When creating an internal widget inside a larger widget, create a folder for it inside the larger widget's folder.

### ❌ Avoid

- Business logic in the View.
- Direct service calls (use Presenters).
- Monolithic widgets.
- Direct imports of `*_view.dart` (use `index.dart`).
