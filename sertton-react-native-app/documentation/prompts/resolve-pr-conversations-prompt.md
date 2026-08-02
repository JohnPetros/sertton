---
description: Resolve merge-blocking pull request issues using GitHub CLI and the Sertton project conventions.
---

# Prompt: Resolve PR Conversations

**Objective:** Act as the pull request caretaker until the PR is merge-ready. Diagnose and resolve the issues that block merging, including:

1. failing CI checks
2. unresolved review conversations
3. regressions introduced by the branch

All fixes must respect the Sertton architecture, layer boundaries, and repository rules.

---

## Input

- Full GitHub PR URL, for example: `https://github.com/<owner>/<repo>/pull/123`

Use **GitHub CLI (`gh`)** for GitHub interaction.

---

## Project Context

Sertton is a single Flutter/Dart application with these main layers:

- `lib/core/`
- `lib/rest/`
- `lib/drivers/`
- `lib/ui/`

Before changing code, align with:

- `documentation/architecture.md`
- `documentation/rules/rules.md`
- relevant layer rule files in `documentation/rules/`

Typical local validation uses Flutter and Dart tooling such as:

- `dart format`
- `flutter analyze`
- `flutter test`

---

## Execution Guidelines

### 1. Extract PR context

From the PR URL, identify:

- owner
- repository
- pull request number

Read the PR state first:

```bash
gh pr view <pull_number> --repo <owner>/<repo> --json title,body,headRefName,baseRefName,files,mergeable,statusCheckRollup
```

Then check out the PR branch locally:

```bash
gh pr checkout <pull_number> --repo <owner>/<repo>
```

If the PR is already mergeable, checks are green, and no unresolved conversations remain, stop there.

### 2. Diagnose all blockers before fixing

Inspect the current PR checks:

```bash
gh pr checks <pull_number> --repo <owner>/<repo>
```

If checks are still running, poll until they finish:

```bash
while gh pr checks <pull_number> --repo <owner>/<repo> | grep -Eq '\b(pending|in_progress)\b'; do
  sleep 10
done
```

For failed runs, inspect only the failed job logs:

```bash
gh run view <run_id> --repo <owner>/<repo> --log-failed
```

For review feedback, list unresolved review threads using GraphQL:

```bash
gh api graphql -f query='
{
  repository(owner: "<owner>", name: "<repo>") {
    pullRequest(number: <pull_number>) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          isOutdated
          comments(first: 10) {
            nodes {
              path
              body
              author { login }
            }
          }
        }
      }
    }
  }
}'
```

Focus only on threads where:

- `isResolved` is `false`
- `isOutdated` is `false`

### 3. Triage each blocker

Classify each item as:

- **Fix directly:** CI failures, review comments with clear implementation direction, regressions caused by the branch
- **Escalate:** architectural changes, product-scope conflicts, unclear trade-offs, or feedback that changes intended behavior materially
- **Ignore:** informational comments already addressed by the existing code

Escalate before acting when the fix would:

- change product behavior beyond the spec or bug report
- violate a layer rule
- require a new architectural pattern
- conflict with the current technical spec or documented flow

### 4. Fix issues locally

Before changing code:

- read `documentation/rules/rules.md`
- read the affected layer rules
- inspect the referenced files and nearby patterns

Use repository-appropriate local validation for the impacted scope, typically:

```bash
dart format <paths>
flutter analyze
flutter test
```

If the PR touches UI behavior, also validate the relevant widget or flow manually when needed.

### 5. Resolve review threads after the fix

After implementing and validating a fix, resolve the corresponding review thread:

```bash
gh api graphql -f query='
mutation {
  resolveReviewThread(input: { threadId: "<thread_id>" }) {
    thread { id isResolved }
  }
}'
```

Do not resolve threads that still depend on user input or an unimplemented decision.

### 6. Commit, push, and re-check

After fixing issues locally:

```bash
git status --short
git add <files>
git commit -m "<message following the repository convention>"
git push
```

Then re-check the PR state:

```bash
gh pr checks <pull_number> --repo <owner>/<repo>
gh pr view <pull_number> --repo <owner>/<repo> --json mergeable,statusCheckRollup
```

Repeat diagnosis and fixes until:

- all required checks pass
- all fixable review threads are resolved
- only escalated items, if any, remain open

### 7. Update documentation when needed

If the final fix changes the documented implementation direction:

- update the relevant spec or bug report
- update `documentation/architecture.md` if architectural flow changed
- update a rule file only if the fix establishes a reusable new convention

---

## Expected Output

Report progress in this structure:

```md
## PR Resolution Summary

### CI Fixed
- [x] <check name> - <root cause and fix>

### Review Conversations Addressed
- [x] <file> - <implemented change>

### Escalated Items
- [ ] <item> - <why user input is needed>

### Ignored Items
- <item> - <reason>

### Final Status
- CI: <green | pending | failing>
- Review threads: <resolved count and remaining count>
```
