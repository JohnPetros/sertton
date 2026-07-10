---
description: Implement a formal plan in the Sertton codebase while respecting layer rules and validating each completed task.
---

# Prompt: Implement Plan

**Objective:** Execute a plan from `documentation/plan.md` in the Sertton Flutter project, following the required task order, preserving architectural boundaries, and validating each completed task before moving forward.

---

## Input

- Active plan in `documentation/plan.md`
- If the user explicitly provides a different plan path, use that instead

---

## Golden Rule

Before implementing any task:

1. Identify the task layer.
2. Read `documentation/rules/rules.md`.
3. Read the corresponding rule files for the impacted layers.
4. Only then edit code.

Do not rely on generic framework habits when the project already defines a repository-specific pattern.

---

## Project Context

Sertton is a single Flutter/Dart application. The expected implementation order is usually:

1. `core`
2. `drivers` and `rest`
3. `ui`

Respect the dependencies written in the plan even when a task appears simple.

Never implement a consuming layer before the layer it depends on.

---

## Execution Guidelines

### 1. Read the entire plan first

Before editing code:

- read the full plan
- identify pending items
- map all affected layers
- identify task dependencies
- identify validation expectations

If the plan is incomplete or contradicts the codebase, stop and resolve the issue before implementing.

### 2. Read repository guidance

At minimum, consult:

- `documentation/rules/rules.md`
- `documentation/rules/code-conventions-rules.md`

Then read the specific rule files for the touched layers:

- `documentation/rules/core-layer-rules.md`
- `documentation/rules/drivers-layer-rules.md`
- `documentation/rules/rest-layer-rules.md`
- `documentation/rules/ui-layer-rules.md`
- `documentation/rules/unit-tests-rules.md`

### 3. Inspect the existing code before creating anything new

Use Serena or direct repository search to locate:

- similar implementations
- neighboring files in the same domain
- existing presenters, DTOs, services, widgets, and drivers
- current naming and folder patterns

Do not assume a path, class, method, or provider exists without verifying it.

### 4. Implement task by task

For each task:

- implement the minimum change that satisfies the observable outcome
- keep the change inside the intended layer
- follow existing project naming and structure
- avoid mixing responsibilities across layers

For test tasks:

- follow `documentation/rules/unit-tests-rules.md`
- use existing tests in the same area as style references
- cover the scenario described by the plan's observable outcome

### 5. Validation after each completed task

After each task, run the relevant validation for the affected scope before moving on.

Prefer repository-appropriate Flutter and Dart commands such as:

- `dart format <paths>`
- `flutter analyze`
- `flutter test`

When the task only touches a narrow area, prefer targeted validation first, then run broader validation before finishing the phase.

Do not continue with failing validation caused by your changes.

If a failure is pre-existing and outside the task scope, report it clearly with evidence.

### 6. UI verification

When a task affects screens, widgets, navigation, forms, or visual states:

- run the most relevant widget or Flutter tests
- if needed, validate the flow manually in the app
- confirm there is no broken navigation, blank state regression, or obvious layout issue

Document any manual verification you performed.

### 7. Keep the plan updated

As tasks are completed:

- mark completed tasks as `[x]`
- leave pending tasks as `[ ]`
- if blocked, record the reason directly in the plan or in your final report

### 8. Update documentation when required

If implementation introduces a new architectural pattern or layer convention:

- update `documentation/architecture.md` if the architectural flow changed
- update the relevant file in `documentation/rules/` if the implementation establishes a new reusable rule

If no documentation update is needed, say so in the final report.

### 9. Completion criteria

The plan implementation is only complete when all of the following are true:

- completed tasks are checked off in `documentation/plan.md`
- code changes match the plan's observable outcomes
- required validation has been executed
- any remaining blockers are explicitly documented

If the plan cannot be completed, clearly state what remains and why.

---

## Restrictions

- Do not skip reading layer rules.
- Do not implement tasks out of dependency order.
- Do not expand scope beyond the plan.
- Do not invent abstractions when nearby patterns already solve the problem.
- Do not leave plan checkboxes outdated after finishing work.

---

## Expected Output

- The requested code changes implemented in the repository
- The plan updated with completed and pending tasks
- Validation results for the work performed
- Any blockers or follow-up items still remaining
