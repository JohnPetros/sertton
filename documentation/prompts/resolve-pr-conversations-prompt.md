---
description: Resolve GitHub pull request review conversations and validate the resulting changes.
---

# Prompt: Resolve PR Conversations (using gh CLI)

**Main Objective**
Analyze, implement, and resolve all pending conversations and feedback in a specific GitHub Pull Request (PR). The focus is to ensure that all improvement points, bug fixes, and design suggestions raised by reviewers are properly addressed in the code.

**Input:**

* **PR Link:** Full GitHub Pull Request URL (for example `https://github.com/owner/repo/pull/123`).

---

## Execution Guidelines

### 1. Context Extraction

* Identify `owner`, `repo`, and `pullNumber` from the provided URL.
* Use **gh CLI** to retrieve PR details.

Example:

```bash
gh pr view <pullNumber> --repo owner/repo --comments
```

---

### 2. Conversation Mapping

* List all PR review comments.

Possible commands:

```bash
gh pr view <pullNumber> --repo owner/repo --json reviewThreads
```

or through the API:

```bash
gh api repos/owner/repo/pulls/<pullNumber>/comments
```

* Filter conversations that are:

  * unresolved
  * change requests
  * code change suggestions

---

### 3. Analysis and Implementation

For each comment:

* Identify:

  * affected file
  * code excerpt
  * reviewer suggestion

* Apply changes to the local code using file editing tools:

  * `replace_file_content`
  * `multi_replace_file_content`

* Ensure compliance with:

```text
documentation/rules/code-conventions-rules.md
documentation/architecture.md
```

---

### 4. Validate Changes

After implementation:

Run analyzer:

```bash
flutter analyze
```

Run tests:

```bash
flutter test
```

---

### 5. Finalization

Provide a detailed summary:

* which conversations were resolved
* which files were changed
* which standards were adjusted
* which bugs were fixed

---

## WORKFLOW

### Step 1 - Data Collection

List PR comments:

```bash
gh api repos/owner/repo/pulls/<pullNumber>/comments
```

or

```bash
gh pr view <pullNumber> --comments
```

---

### Step 2 - Diagnosis

For each thread:

* affected file
* described problem
* proposed solution

---

### Step 3 - Execution

Modify local files as necessary.

If the comment is ambiguous, ask for clarification before changing anything.

---

### Step 4 - Conclusion

Progress report:

```text
[x] File X - comment Y resolved (description)
[x] File Z - standard adjustment applied
```

---

### Step 5 - Validation

Run:

```bash
flutter analyze
flutter test
```

---

### Step 6 - Documentation Update

Update, if necessary:

* Spec
* Bug Report
* related PRD
