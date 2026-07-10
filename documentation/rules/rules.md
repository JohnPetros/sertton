# Project Guidelines Documentation Guide

This file serves as an index for the project's documentation guidelines. Refer to the specific files below based on the task at hand.

## User Interface Guidelines (ui)
**File:** `/documentation/rules/ui-layer-rules.md`
**When to consult:**
- When creating a UI-related document.
- When creating or modifying Flutter Widgets (MVP Pattern).
- To understand the View/Presenter structure.
- For state management with `signals` and injection with `riverpod`.
- When using `shadcn_flutter` components.

## Code Conventions
**File:** `/documentation/rules/code-conventions-rules.md`
**When to consult:**
- When creating a code-related document.
- For general naming conventions (variables, functions, classes, files).
- For rules about barrel files (`index.dart`).
- To understand directory structure and overall organization.

## Drivers Layer Guidelines
**File:** `/documentation/rules/drivers-layer-rules.md`
**When to consult:**
- When creating a drivers-related document.
- When implementing adapters for external libraries (Env, Navigation, Local Storage, etc.).
- To understand how to isolate infrastructure from the domain layer (Core).
- When configuring third-party tool initialization.

## Core Package Guidelines (core)
**File:** `/documentation/rules/core-layer-rules.md`
**When to consult:**
- When creating a document related to the core layer.
- To understand Domain architecture (Clean Architecture).
- When defining Entities, Use Cases, and Interfaces.
- For abstraction contracts that will be implemented by Drivers or Repositories.

## REST Layer Guidelines
**File:** `/documentation/rules/rest-layer-rules.md`
**When to consult:**
- When creating a document related to the rest layer.
- When making HTTP requests to external APIs.
- To implement REST clients and API response/error handling.

## Unit Test Guidelines
**File:** `/documentation/rules/unit-tests-rules.md`
**When to consult:**
- When creating a document related to unit tests.
- When writing tests for Use Cases, Presenters, and other logic classes.
- To understand Mock and Faker patterns.
- For best practices around test structure and naming.

## Development Guidelines
**File:** `/documentation/rules/developement-rules.md`
**When to consult:**
- When creating a development-related document.
- For Git workflow (Commits, PRs, Branches).
- For commit message and versioning standards.
