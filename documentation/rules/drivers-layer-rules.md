# Drivers Layer Guidelines

## Overview

The **Drivers** layer (`lib/drivers/`) is responsible for providing the concrete infrastructure implementations and external mechanisms defined by the interfaces in the **Core** layer (`lib/core/`).

This layer isolates code that depends on external libraries and frameworks (such as Router, DotEnv, LocalStorage, Firebase, etc.) from the rest of the application, following the **Dependency Inversion** principle.

## Responsibilities

* Implement infrastructure interfaces defined in `Core`.
* Encapsulate calls to external libraries.
* Adapt third-party APIs to domain contracts.
* Configure initialization for external tools (when necessary and not done in `main`).
* It **MUST NOT** contain business rules.
* It **MUST NOT** depend directly on the UI or Rest layer (except for required types, though ideally only Core).

## Directory Structure

Organization should be done by feature/driver, containing the implementation and an export file.

```text
lib/drivers/
├── env-driver/
│   ├── index.dart            # Exports the drivers
│   └── dot_env_driver.dart   # Concrete implementation using flutter_dotenv
├── navigation-driver/
│   ├── index.dart
│   └── go_router_navigation_driver.dart
└── [other-drivers]/
```

## Naming Conventions

* **Folders**: kebab-case (for example `env-driver`, `local-storage-driver`).
* **Files**: snake_case (for example `dot_env_driver.dart`).
* **Classes**: PascalCase, usually ending with the driver or implementation name (for example `DotEnvDriver`, `GoRouterNavigationDriver`) and implementing the Core interface.

## Rules and Guidelines

### 1. Dependency on the Core Layer
Drivers must always implement an interface defined in the **Core** layer. This guarantees that the application depends on the contract, not the concrete implementation.

**Correct (Core):**
```dart
// lib/core/global/interfaces/env_driver.dart
abstract class EnvDriver {
  String get(String key);
}
```

**Correct (Drivers):**
```dart
// lib/drivers/env-driver/dot_env_driver.dart
import 'package:sertton/core/global/interfaces/env_driver.dart';

class DotEnvDriver implements EnvDriver { ... }
```

### 2. External Library Isolation
Avoid leaking external library types outside this layer. If a library returns a complex object, map it to a DTO or primitive type defined in Core.

### 3. Simplicity
Keep implementations as simple as possible. The goal is only to connect the Core interface to the external library functionality. Complex decision logic should live in Core (UseCases/Services) or UI (Presenters).

### 4. Error Handling
Catch library-specific errors and, if necessary, throw domain exceptions or return safe default values, according to the interface contract.

## Examples

### EnvDriver (Environment Variables)

Implementation that uses the `flutter_dotenv` package to read environment variables.

```dart
// lib/drivers/env-driver/dot_env_driver.dart
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:sertton/core/global/interfaces/env_driver.dart';

class DotEnvDriver implements EnvDriver {
  @override
  String get(String key) {
    return dotenv.env[key] ?? '';
  }
}
```

### NavigationDriver (Navigation)

Implementation that uses `go_router` to manage navigation. Notice how the `GoRouter` dependency is injected or managed internally, adapting it to the `NavigationDriver` interface.

```dart
// lib/drivers/navigation-driver/go_router_navigation_driver.dart
import 'package:go_router/go_router.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';

class GoRouterNavigationDriver implements NavigationDriver {
  final GoRouter _router;

  GoRouterNavigationDriver(this._router);

  @override
  void go(String route, {Object? data}) {
    _router.go(route, extra: data);
  }

  @override
  void back() {
    if (_router.canPop()) {
      _router.pop();
    }
  }
}
```
