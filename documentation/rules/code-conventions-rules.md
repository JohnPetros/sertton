# Code Conventions & Guidelines

## Overview
This document defines the code conventions adopted in the Sertton project to ensure consistency, readability, and maintainability.

---

## 1. Language & Naming Guidelines
* **Code:** All code (variables, classes, functions, files, and code directories) must be written in **English**.
* **Documentation and UI:** Explanatory comments, documentation (such as this file), and text shown to end users (UI strings) must be written in **Portuguese**.
* **Case Style:**
    * **Classes/Interfaces:** `PascalCase`.
    * **Variables/Functions:** `camelCase`.
    * **Files/Directories:** `snake_case`.

## 2. Code Quality & Clean Code
* **Single Responsibility (SRP):** Classes and functions should have only one reason to change.
* **Self-documentation:** Code should be clear enough that comments are rarely necessary. Avoid abbreviations.
* **Dart & Flutter:** Strictly follow [Effective Dart](https://dart.dev/guides/language/effective-dart).
* **Small Functions:** Ideally, functions should not exceed 30-40 lines.

## 3. Architecture & UI (MVP Pattern)
* **Widget Structure:** Every complex widget must live in its own folder inside `ui/<module>/widgets/`.
* **Componentization:** If a widget is globally reusable, place it in a shared components folder (for example `lib/ui/global/widgets/`).
* **Visual Standardization:**
    * Always use **shadcn_flutter** components instead of raw Material Design.
    * **Colors:** Use the shadcn palette (for example `Colors.gray` instead of `Colors.grey`).
* **State Logic:**
    * Always separate rendering logic (View) from state logic (Presenter).
    * Use `signals` for reactive state inside the Presenter.
    * Use `Riverpod` for dependency injection and global state management.

## 4. Import Organization
Imports must be organized into blocks separated by a blank line, following the layer hierarchy:

1. **External Libraries and SDK:** (`dart:*`, `package:flutter/*`, third-party packages).
2. **Core Layer:** (`package:sertton/core/*`).
3. **Rest Layer:** (`package:sertton/rest/*`).
4. **Drivers Layer:** (`package:sertton/drivers/*`).
5. **UI Layer:** (`package:sertton/ui/*`).

### Example
```dart
// 1. External Libraries
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

// 2. Core Layer
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';

// 3. Rest Layer
import 'package:sertton/rest/dio/dio_rest_client.dart';

// 5. UI Layer
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart';
```

## 5. Maintainability & General Rules
* **Immutability:** Prefer `final` for class fields and local variables whenever possible.
* **Error Handling:** Use the `RestResponse<T>` defined in Core to encapsulate API failures.
* **Relative Imports:** Avoid relative imports (`../../`) for files outside the local directory; always use the absolute package path (`package:sertton/...`).
