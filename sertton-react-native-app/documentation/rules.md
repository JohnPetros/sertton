# Project Rules Index

This file is the entry point for the project rules.

## On-demand rule reading

Before starting a task:

1. Read this index.
2. Identify the rule documents relevant to the requested task.
3. Read the complete relevant document before modifying or reviewing code.
4. If the task spans multiple layers, read each applicable document.
5. Do not load unrelated rule documents.
6. Re-read a rule document when the task changes scope or introduces a new layer.
7. When a rule document references another project rule, follow that reference only if it applies to the current task.

The rule documents are authoritative for their respective areas. User instructions take precedence when they explicitly conflict with a project rule.

## Rule document selection

| Task scope | Rule document | Read when |
| --- | --- | --- |
| UI screens, widgets, hooks, navigation, state, accessibility | [ui-layer-rules.md](rules/ui-layer-rules.md) | Creating, modifying, reviewing, or testing UI code under `src/ui` |
| Unit, widget, integration, API, or Maestro tests | [testing-rules.md](rules/testing-rules.md) | Creating, modifying, reviewing, or executing automated tests |
| HTTP clients, Expo API Routes, controllers, Yampi services, mappers | [rest-layer-rules.md](rules/rest-layer-rules.md) | Creating, modifying, or reviewing REST/API code under `src/rest` or `src/app/api` |

## Cross-layer tasks

Read all applicable documents before acting.

Examples:

- A screen that consumes a REST service: `ui-layer-rules.md` and `rest-layer-rules.md`.
- A widget and its tests: `ui-layer-rules.md` and `testing-rules.md`.
- An API Route test: `rest-layer-rules.md` and `testing-rules.md`.
- A Maestro flow for a screen backed by an API: `ui-layer-rules.md`, `rest-layer-rules.md`, and `testing-rules.md`.

## Documentation maintenance

When adding a new rules document:

1. Place it under `documentation/rules/`.
2. Add it to the selection table above.
3. Define the task scope that requires it.
4. Keep this index concise; detailed rules belong in the referenced document.

