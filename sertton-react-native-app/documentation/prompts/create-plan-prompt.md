---
description: Create a phased implementation plan from a technical spec for the Sertton Flutter project.
---

# Prompt: Create Plan

**Objective:** Transform a technical spec into a structured implementation plan, split into phases and atomic tasks, with explicit dependencies and observable outcomes. The plan must be directly executable by a developer or coding agent working in the Sertton codebase.

---

## Input

The following document must be provided:

- **Technical spec**: `documentation/features/{domain}/specs/{name}-spec.md`

Bug reports are not direct input for this flow. If the work starts from a bug report, first create a dedicated fix spec derived from that report, then create the plan from the spec.

If the spec is missing, incomplete, or too ambiguous to drive implementation, do not create the plan. Record the issue in **Pending Items** and ask for the correct input.

---

## Project Context

This repository is a single Flutter/Dart application, not a multi-app monorepo. Plans must reflect the actual project structure:

- `lib/core/`: DTOs, interfaces, domain contracts, response models
- `lib/rest/`: Dio clients, Yampi integrations, service implementations, mappers
- `lib/drivers/`: infrastructure adapters such as environment and local integrations
- `lib/ui/`: widgets, screens, presenters, routing integration

Typical execution order is bottom-up:

1. `core`
2. `drivers` and `rest`
3. `ui`

Not every phase is required for every spec. Omit phases that are not impacted.

---

## Execution Guidelines

### 1. Read the input spec completely

Identify:

- The affected domain or feature
- Which layers will be touched: `core`, `drivers`, `rest`, `ui`
- Files to create, modify, or remove
- Dependencies between tasks
- Open questions or ambiguities that could block implementation

### 2. Define phases

Use only the phases that make sense for the spec:

- **F1 - Core**
- **F2 - Drivers/Rest**
- **F3 - UI**

Rules:

- Start with `core` whenever domain contracts, DTOs, or interfaces change.
- `drivers` and `rest` depend on the contracts defined in `core`.
- `ui` must depend on the lower layers it consumes.
- If a spec only changes one layer, create only the needed phase.

### 3. Define implementation tasks

Each task must be atomic:

- one responsibility
- one observable outcome
- one clear layer

Allowed layer values:

- `core`
- `drivers`
- `rest`
- `ui`
- `test`
- `docs`

Each task must include:

- task ID
- concise action
- explicit dependencies
- observable outcome
- layer

### 4. Define testing tasks

Add dedicated test tasks whenever the implementation affects behavior that should be validated.

Use the project testing guidance in:

- `documentation/rules/unit-tests-rules.md`

Testing task rules:

- A testing task must depend on its corresponding implementation task.
- Use the same base task ID with suffix `t`.
- The observable outcome must describe the scenarios covered.
- Only add tests where they make sense for this repository: DTO behavior, presenters, service logic, mapping logic, and widgets when relevant.

### 5. Record pending items

List any ambiguity, missing input, or unresolved decision that may block implementation.

Each pending item must include:

- what is missing or unclear
- why it matters
- what is needed to resolve it

---

## Output

Save the final plan to:

- `documentation/plan.md`

Use the template below.

```md
---
description: Implementation plan derived from a technical spec for the Sertton project.
source_spec: documentation/features/{domain}/specs/{name}-spec.md
---

## Pending Items (if applicable)

- [ ] <describe the missing information or ambiguity>

---

## Phase Dependency Table

| Phase | Goal | Depends on |
| --- | --- | --- |
| F1 | <core contracts and domain updates> | - |
| F2 | <drivers/rest implementation> | F1 |
| F3 | <UI integration and presentation> | F1, F2 |

> Use only the phases required by the spec.

---

## F1 - Core

**Goal:** Define or adjust DTOs, interfaces, response models, and domain contracts without infrastructure concerns.

### Tasks

- [ ] **T1.1** - <implement core artifact>
  - **Depends on:** -
  - **Observable outcome:** <what must be true when done>
  - **Layer:** `core`

- [ ] **T1.1t** - <test core artifact>
  - **Depends on:** T1.1
  - **Observable outcome:** <covered scenarios and expected passing tests>
  - **Layer:** `test`
  - **Rules:** `documentation/rules/unit-tests-rules.md`

---

## F2 - Drivers/Rest

**Goal:** Implement infrastructure adapters, HTTP integrations, Yampi services, and mappers that consume the contracts defined in `core`.

### Tasks

- [ ] **T2.1** - <implement driver, service, or mapper>
  - **Depends on:** <task IDs>
  - **Observable outcome:** <what must be true when done>
  - **Layer:** `drivers` or `rest`

- [ ] **T2.1t** - <test driver, service, or mapper>
  - **Depends on:** T2.1
  - **Observable outcome:** <covered scenarios and expected passing tests>
  - **Layer:** `test`
  - **Rules:** `documentation/rules/unit-tests-rules.md`

---

## F3 - UI

**Goal:** Implement screens, widgets, presenters, providers, and route integration that consume the lower-layer contracts.

### Tasks

- [ ] **T3.1** - <implement presenter, widget, or screen update>
  - **Depends on:** <task IDs>
  - **Observable outcome:** <what must be true when done>
  - **Layer:** `ui`

- [ ] **T3.1t** - <test presenter or widget behavior>
  - **Depends on:** T3.1
  - **Observable outcome:** <covered scenarios and expected passing tests>
  - **Layer:** `test`
  - **Rules:** `documentation/rules/unit-tests-rules.md`
```
