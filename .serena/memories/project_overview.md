# Sertton Project Overview

## Purpose
Development of a native e-commerce app for the Sertton brand, focusing on high performance, fluid navigation, and integration with the Yampi platform.

## Tech Stack
- **Language:** Dart
- **Framework:** Flutter
- **State Management & DI:** Riverpod, Signals
- **Navigation:** GoRouter
- **HTTP Client:** Dio
- **Validation:** LucidValidation
- **UI Kit:** Flutter ShadCn
- **Animations:** Flutter Animate
- **Mocks/Fakers:** Mocktail, Faker

## Architecture
Layered architecture:
1. **UI:** Widgets, Screens, and Presentation Logic (MVP pattern: View/Presenter).
2. **Validation:** Input validation schemas.
3. **Core:** DTOs, Interfaces, Response wrappers, and Business rules.
4. **Rest:** Service implementations and HTTP communication.
5. **Drivers:** Infrastructure adapters (e.g., DotEnv).

## Domain Modules
- Catalog
- Checkout
- Marketing
- Reviewing
