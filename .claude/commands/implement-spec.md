---
description: Implement a small technical spec directly in the Sertton codebase without creating a formal plan.
---

# Prompt: Implement Spec

**Objective:** Implement a small, well-bounded technical spec directly in the Sertton Flutter project without creating `documentation/plan.md`. Use this prompt only when the spec is clear, the execution order is straightforward, and the change can be validated locally without multi-phase coordination.

---

## Input

- **Spec path:** `documentation/features/**/specs/*-spec.md`
- Optional narrowed scope: a section, requirement, or issue inside that spec
- Optional user constraints: priority, files already touched, or scope limits

If the spec path is not explicitly given, infer it only when there is one safe candidate. If multiple plausible specs exist, ask for confirmation.

---

## When to Use

Use `implement-spec` only when all of the following are true:

- the spec is already clear enough for direct execution
- the implementation fits a short sequence of edits
- there is no need for formal phased coordination
- layer dependencies are simple and obvious
- validation can be handled with local Flutter/Dart checks and tests

Do not use this prompt when the work involves:

- broad cross-layer refactors
- a large feature spanning many screens and services
- unclear ownership between layers
- multiple high-impact technical decisions still unresolved
- work that should be decomposed into formal tasks first

In those cases, stop and use `create-plan` followed by `implement-plan`.

---

## Execution Guidelines

### 1. Mandatory reading

Before editing code:

- read the full spec
- read `documentation/rules/rules.md`
- identify the affected layers
- read only the corresponding layer rules
- inspect the files referenced by the spec
- inspect similar existing implementations in the same domain

### 2. Scope check

Classify the task before editing:

- **Direct:** safe to implement now with this prompt
- **Broad:** requires `create-plan` + `implement-plan`
- **Ambiguous:** requires user clarification before editing

If the task is broad or ambiguous, stop before changing code.

### 3. Implementation

Follow the spec as the source of truth.

Implementation principles:

- make the smallest change that delivers the specified behavior
- preserve layer boundaries
- follow neighboring file patterns before introducing new abstractions
- keep business rules out of the wrong layer
- if the spec is factually outdated, adjust it only in a small, justified way

For this repository, preserve these boundaries:

- `core` stays free of Flutter widgets and infrastructure details
- `rest` owns API integration and mapping concerns
- `drivers` owns infrastructure adapters
- `ui` owns presentation, interaction, and navigation concerns

### 4. Tests

Add or update tests when the change affects:

- business behavior
- DTO or mapper behavior
- service behavior
- presenter state transitions
- widget rendering or user interaction

Follow:

- `documentation/rules/unit-tests-rules.md`

Reuse existing project testing patterns rather than inventing new ones.

### 5. Validation

After changing code, run the relevant checks for the affected scope.

Prefer the repository's real Flutter/Dart commands, such as:

- `dart format <paths>`
- `flutter analyze`
- `flutter test`

If the change affects UI behavior, also perform the most appropriate additional validation available, such as:

- widget tests
- targeted manual flow validation in the app

If a command fails because of your change, fix it before finishing. If a failure is pre-existing and outside scope, report it clearly.

### 6. Completion

At the end, report:

- what was implemented
- the main files changed
- validation commands executed and results
- any pending items or follow-up risks

---

## Restrictions

- Do not create a formal plan.
- Do not use this prompt for large or phased work.
- Do not invent files, methods, contracts, or patterns without evidence from the codebase or spec.
- Do not ignore the project rules.
- Do not silently expand scope beyond the requested spec.
