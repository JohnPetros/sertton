---
description: Create a standardized pull request with GitHub CLI for the Sertton repository.
---

# Prompt: Create PR

**Objective:** Create a clean, review-friendly pull request for the Sertton repository using GitHub CLI. The PR must clearly explain what changed, why it changed, and how reviewers should validate it.

---

## Input

- Implemented and validated work
- A feature, fix, refactor, or docs branch with committed changes
- Optional related documents:
  - technical spec
  - bug report
  - issue link

---

## Project Context

The PR should reflect Sertton's real structure and conventions:

- Flutter/Dart application
- layered architecture with `core`, `rest`, `drivers`, and `ui`
- conventional commit messages with the repository's configured style

Before creating the PR, review:

- the implemented spec or bug report, if one exists
- the diff and commit history on the branch
- validation results

---

## Execution Guidelines

### 1. Review the branch state

Check whether there are uncommitted changes:

```bash
git status --short
git diff --stat
```

If there are uncommitted changes, commit them before creating the PR.

If the branch contains unrelated or unfinished work, stop and resolve that before opening the PR.

### 2. Define the PR title

The title must be:

- short
- direct
- written in English
- descriptive of the user-facing or technical outcome

Do not use commit-style prefixes such as:

- `fix:`
- `feat:`
- `refactor:`

Prefer titles like:

- `Fix product image loading on the catalog screen`
- `Reorganize project documentation prompts`
- `Add cart item quantity validation`

### 3. Build the PR body

Use Markdown and keep it concise but complete.

Required structure:

```md
## Objective

<Why this PR exists and what it delivers>

## Changes

- <important change>
- <important change>

## Validation

- <command or validation step>
- <command or validation step>

## Related References

- Spec: <path or link, if applicable>
- Bug report: <path or link, if applicable>
- Issue: <link, if applicable>

## Notes

<Optional reviewer guidance, risks, or follow-up items>
```

Optional section for fixes:

```md
## Root Cause

<Short technical explanation of the original problem>
```

### 4. Create the PR with GitHub CLI

Use `gh pr create`.

Example with a body file:

```bash
gh pr create \
  --base main \
  --head <branch-name> \
  --title "<pr title>" \
  --body-file pr_body.md
```

Or inline:

```bash
gh pr create \
  --base main \
  --head <branch-name> \
  --title "<pr title>" \
  --body "<markdown body>"
```

### 5. Return the PR link

After creation, retrieve the URL:

```bash
gh pr view --json url,title
```

Return:

- PR URL
- final PR title
- short summary of the body content

---

## Writing Rules

- Write the PR title and body in English.
- Do not dump the full changelog file-by-file unless needed for clarity.
- Focus on reviewer comprehension: outcome, key changes, and validation.
- Mention manual validation when UI behavior was tested by hand.
- Mention remaining risks or follow-up items when relevant.
