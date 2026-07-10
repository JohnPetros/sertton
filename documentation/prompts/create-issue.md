---
description: Draft and optionally create GitHub issues aligned with the Sertton project context and codebase.
---

# Prompt: Create Issue

**Objective:** Draft a clear, actionable GitHub issue for the Sertton project based on product context, a bug report, or technical maintenance scope. Always present the draft to the user for approval before creating the issue on GitHub.

---

## Input

- Issue type: `task`, `bug`, or `chore`
- Optional product or feature context
- Optional related document:
  - technical spec
  - bug report
  - PRD note
  - GitHub issue or discussion reference

If there is not enough context to define the issue safely, stop and ask for the missing information before drafting.

---

## Project Context

The issue must reflect the real Sertton repository structure:

- `lib/core/`
- `lib/rest/`
- `lib/drivers/`
- `lib/ui/`

Before drafting, align with:

- `documentation/overview.md`
- `documentation/architecture.md`
- `documentation/rules/rules.md`

Use the codebase as a factual reference for:

- affected domain
- current implementation
- likely impacted files
- technical constraints

---

## Issue Types

- `task`: new feature, enhancement, or delivery item
- `bug`: incorrect or broken behavior
- `chore`: refactor, tooling, documentation, maintenance, or technical cleanup without new product behavior

---

## Execution Guidelines

### 1. Understand the request

Identify:

- the desired outcome
- the affected flow or domain
- whether this is product work, bug fixing, or technical maintenance

### 2. Research the repository context

Inspect the relevant documentation and code to determine:

- the domain involved
- the impacted layers
- similar existing implementations
- technical constraints that should shape the issue

Use real file references whenever possible.

### 3. Decide whether to split the scope

Create a single issue when the work is one coherent deliverable.

Split into multiple issues only when the work naturally separates into independent deliverables, for example:

- infrastructure work separate from UI work
- a bug fix separate from follow-up cleanup
- one feature broken into clearly independent subflows

Each issue must remain verifiable and bounded.

### 4. Write the draft first

Before creating anything on GitHub:

- write the draft to `documentation/issue.md`
- present the draft to the user
- wait for explicit approval

Do not create the GitHub issue before approval.

### 5. Create the issue only after approval

After approval, use `gh issue create`.

Example:

```bash
gh issue create \
  --title "<issue title>" \
  --body-file documentation/issue.md
```

Add labels or metadata only when you have confirmed they exist in the repository and match the intended issue type.

---

## Draft Structure

The issue draft must follow this structure:

```md
Title: <short, descriptive issue title>

## Objective

<What should be delivered or corrected, and why it matters>

## Context

- Type: <task|bug|chore>
- Domain: <catalog|checkout|marketing|reviewing|shipping|global|institutional|other>
- Affected layers: <core, rest, drivers, ui>

## Product Requirements

<Include only when the issue is product-driven and the requirements are known>

## Technical Requirements

- <technical constraint or implementation expectation>
- <technical constraint or implementation expectation>

## Codebase References

- `path/to/file.dart` - <why it is relevant>
- `path/to/another_file.dart` - <why it is relevant>

## Acceptance Criteria

- [ ] <verifiable outcome>
- [ ] <verifiable outcome>

## Notes

<Optional risks, sequencing notes, or related documents>
```

---

## Writing Rules

- Write the issue in English.
- Keep the title short, direct, and descriptive.
- Do not use commit-style prefixes such as `fix:`, `feat:`, or `chore:`.
- Prefer repository facts over speculation.
- Use real codebase paths when referencing implementation areas.
- Do not overdesign the issue body with implementation detail that belongs in a spec.
- For `bug` issues, focus on the problem, impact, and affected code areas.
- For `chore` issues, focus on the maintenance goal, technical risk, and expected cleanup outcome.

---

## Expected Output

Before approval:

- draft written to `documentation/issue.md`
- concise summary shown to the user

After approval:

- GitHub issue created with `gh`
- issue URL returned to the user
