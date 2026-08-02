# Spec-Driven Development (SDD) at Stardust

## What It Is

SDD is the development model adopted by Stardust in which **no code is written before a formal technical specification exists, derived from a PRD**. Every feature, fix, or refactor goes through a traceable documentation chain before becoming code:

```
milestone -> PRD -> technical spec -> direct implementation or plan -> code -> review
```

The goal is to eliminate ambiguity before implementation, allowing developers and AI agents to execute tasks within clearly defined boundaries.

---

## Pipeline

The pipeline is orchestrated by dedicated prompts in `documentation/prompts/`. Each prompt covers one stage of the lifecycle and defines inputs, outputs, and constraints in a prescriptive way.

### 1. Technical Spec - `create-spec-prompt.md`

**Input:** Completed PRD (milestone), task draft, access to the codebase.  
**Output:** `documentation/features/<domain>/specs/<name>-spec.md`

- A strictly defined bridge between the PRD and the code.
- Detailed enough for implementation to be direct and unambiguous.
- Defines **contracts, not code**: TypeScript signatures (name, typed parameters, return type) with a one-line responsibility description.
- Organized by layers (`core`, `REST`, `RPC`, `database`, `UI`, `queue`, `provision`).
- Design decisions are recorded with:
  - alternatives considered;
  - rationale for the chosen approach;
  - impacts and trade-offs.
- If the PRD is missing or incomplete, the spec **cannot begin**.
- Codebase research is delegated to subagents by app/package; decisions remain with the main agent.

### 2. Implementation Plan - `create-plan-prompt.md`

**Input:** Technical spec.  
**Output:** `documentation/plan.md`

- Transforms the spec into phases and atomic tasks with explicit dependencies.
- Use this stage when the spec requires sophisticated coordination: multiple phases, multiple apps/layers, non-trivial dependencies, parallelization, complex migrations, or new contracts across boundaries.
- Mandatory bottom-up order:
  - **F1 - Core:** domain, structures, use cases.
  - **F2, F3, F4 - Apps** (`server`, `web`, `studio`): only start after F1 is complete; they may run in parallel with each other.
- Each task includes:
  - explicit layer (`core`, `database`, `rest`, `rpc`, `ui`, `queue`, `provision`, `ai`, `web`, `studio`);
  - task dependencies;
  - a verifiable observable outcome with no ambiguity.
- Apps not impacted are omitted from the plan.

### 3. Direct Implementation - `implement-spec-prompt.md`

**Input:** Small technical spec.  
**Output:** Implemented code in the codebase, without a formal plan.

- A lightweight path for small specs, targeted fixes, and low-coupling changes.
- Does not create `plan.md`, does not use subagents, and does not split delivery into formal phases.
- It should only be used when:
  - the spec is clear;
  - the execution order is obvious;
  - few files will be changed;
  - there are no new contracts across multiple apps;
  - validation fits within `check:types`, `check:code`, and local tests for the affected workspace.
- If the task turns out to be broad or ambiguous during reading, the flow must stop and move to `create-plan` + `implement-plan`.
- It remains mandatory to read `documentation/rules/rules.md` and the rules for the affected layers before editing code.

### 4. Planned Implementation - `implement-plan-prompt.md`

**Input:** `documentation/plan.md` (or an alternative path).  
**Output:** Implemented code in the codebase, with checkboxes updated in `plan.md`.

- **Golden Rule:** before touching any layer, read the corresponding rules file in `documentation/rules/`. No exceptions.
- Implementation order: `core` -> `drivers/infra` -> `API layer` -> `UI`.
- Never implement a consuming layer before the layer it consumes.
- Mandatory verification after each task:
  - `npm run check:code` (lint and formatting)
  - `npm run check:types`
  - `npm run test`
- Progress is tracked in the checkboxes inside `plan.md` itself.
- Partially completed plans resume from the first pending task.

### 5. Review - `conclude-spec-prompt.md`

**Input:** Technical spec that guided the implementation.  
**Output:** Closed spec, updated PRD, structured PR summary.

Executes three sequential phases:

**Phase 1 - Verification:**
- Passing tests (`npm run test`)
- Test coverage for new behaviors
- Requirement validation against the spec
- Validation of architectural boundaries
- Code quality review

**Phase 2 - Documentation consolidation:**
- Spec marked as `status: closed`
- PRD updated in the GitHub milestone
- `documentation/architecture.md` updated (when applicable)
- Rules updated (if new patterns were introduced)

**Phase 3 - Communication:**
- Review summary with mandatory structure:
  - what was done;
  - why it was done this way;
  - what changed compared to the original spec;
  - points of attention for the reviewer (migrations, contracts, irreversible decisions, side effects);
  - final checklist.

---

## Bug Flow - `create-bug-report-prompt.md`

Bugs follow a two-step documentation path before entering the main pipeline:

```
problem report -> bug report -> separate fix spec -> direct implementation or plan -> review
```

- The bug report documents the symptom, impact, evidence, diagnosis, and a short fix direction.
- The bug report does **not** contain an implementation plan, tasks, phases, or sections such as "what to create/modify/remove".
- The fix spec is created afterward, only when requested, in its **own file** inside `documentation/features/<domain>/specs/`, using the bug report as input.
- Bug report and spec do **not** coexist in the same `.md` file.
- Small fix specs may go directly to `implement-spec`; complex specs must go through `create-plan` + `implement-plan`.

---

## Where to Find Each Artifact

| Artifact | Location |
|---|---|
| PRD | GitHub milestone (never a local file) |
| Technical spec | `documentation/features/<domain>/specs/<name>-spec.md` |
| Bug report | `documentation/features/<domain>/reports/<name>-bug-report.md` |
| Fix spec derived from bug | `documentation/features/<domain>/specs/<name>-fix-spec.md` |
| Implementation plan | `documentation/plan.md` |
| Layer rules | `documentation/rules/` (index in `rules.md`) |
| Pipeline prompts | `documentation/prompts/` |
| Direct implementation | `documentation/prompts/implement-spec-prompt.md` |
| Planned implementation | `documentation/prompts/implement-plan-prompt.md` |

---

## Principles

1. **Code is derived, never the starting point.** Every change starts from a traceable documentation chain.
2. **Ambiguity is resolved before code.** If the spec has gaps, record them as pending items and ask questions - never invent.
3. **Each layer has its own rules.** Reading the rules before implementing is mandatory, not optional.
4. **Choose the right weight.** Small specs may go straight to `implement-spec`; specs with meaningful dependencies require a formal plan.
5. **Bottom-up whenever there is dependency across layers.** Core before infra, infra before API, API before UI.
6. **Continuous verification.** Code checks, type checks, and tests must pass within the affected scope; in a formal plan, they must pass after each task.
7. **Documentation evolves with the code.** Spec, PRD, architecture, and rules are updated together with the implementation, never afterward.
