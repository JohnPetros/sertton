---
description: Create a GitHub pull request with a standardized title and body using gh CLI.
---

# Prompt: Create PR

**Objective:**
Standardize Pull Request (PR) creation, ensuring clear descriptions that make code review and task tracking easier. The focus is to use only the **GitHub CLI (gh)** to preserve workflow integrity.

---

## Input

* A properly implemented and validated Spec.
* A properly implemented and validated Bug Report.
* A feature (`feature/`), fix (`fix/`), or refactor (`refactor/`) branch with committed changes.

---

## Execution Guidelines

### 1. Context Analysis

* Review the implemented Spec and the changelog of completed changes.
* Identify:

  * technical impacts
  * design decisions made
  * risks and side effects

---

### 2. Title Definition

* It must be:

  * short
  * direct
  * in PT-BR
  * reflective of the essence of the change

Examples:

* Product listing implementation
* Fix image loading error
* Fix navigation to the catalog screen

Do not include prefixes in the title:

```text
feat/
fix/
refactor/
```

---

### 3. Description Structure (Body)

The PR body must follow the template below.

**Formatting rules:**

* use Markdown
* do not use a main `#` title
* use `##` and lower levels

---

## Objective (required)

Explain why this PR was created and its central purpose.

## Related Issues (optional)

Link tasks/bugs:

```text
fixes #123
closes #456
```

---

## Bug Cause (optional - fix only)

Describe the root technical cause.

---

## Changelog (required)

Technical list of changes:

* changed files
* modified behavior
* added rules
* completed refactors

---

## How to Test (required)

Clear step-by-step for the reviewer:

1. ...
2. ...
3. ...

---

## Notes (optional)

* architectural decisions
* known limitations
* tradeoffs
* next steps

---

## 4. Creation via gh CLI

Do not use GitHub MCP.
Do not use MCP APIs.
Use only **gh**.

Standard command:

```bash
gh pr create \
  --repo owner/repo \
  --base main \
  --head <branch-name> \
  --title "<PR Title>" \
  --body-file pr_body.md
```

Or inline:

```bash
gh pr create \
  --base main \
  --head <branch> \
  --title "<Title>" \
  --body "<Formatted description>"
```

---

## 5. Return

After creation:

```bash
gh pr view --web
```

or

```bash
gh pr view --json url
```

Return:

* created PR link
* final title
* summary of the generated body

---

If you want, I can also convert this prompt into:

* slash command
* automatic PR template
* `gh` script + markdown template
* CI workflow to validate the PR body

Just tell me which environment you will use.
