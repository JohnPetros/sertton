---
description: Commit all pending code changes with standardized, descriptive messages.
---

# Prompt: Commit Code (Executing Real Commits)

**Main Objective**

Create **and execute real commits** in the repository for all detected code changes, with highly descriptive and standardized messages, strictly following the project's contribution guidelines.

You **must execute git commands**, not just suggest messages.

---

## Critical Rule

If there are modified files, you are required to:

* run `git add`
* run `git commit`
* repeat the process until there are no pending changes

Never just suggest commits.
Never stop at the message only.
**Always execute the commands.**

---

## Execution Guidelines

### 1. Detect Changes

Run first:

`git status --porcelain`

* If empty -> reply: `No changes to commit`
* If there are changes -> continue

---

### 2. Context Analysis

* Analyze **only the names and paths of the changed files**
* Do not analyze file contents
* Group by responsibility
* If there are changes in different layers (for example UI and REST), create separate commits

---

### 3. Message Pattern (Strict)

Each commit must follow this format:

`emoji prefix: concise description in English`

* Message **must be in English**
* Use only prefixes from the table
* One commit per responsibility

---

## Prefix Table (Preserved)

| Type | Prefix | Emoji |
| :----------------------- | :-------- | :---- |
| Domain layer | domain | 🌐 |
| REST API layer | rest | 📶 |
| UI layer | ui | 🖥️ |
| Database layer | db | 💾 |
| Use cases | use case | ✨ |
| Interfaces | interface | 📑 |
| Typing | type | 🏷️ |
| Documentation | docs | 📚 |
| Bug fix | fix | 🐛 |
| Refactoring | refactor | ♻️ |
| Test | test | 🧪 |
| Release | release | 🔖 |
| Config/Infra | config | ⚙️ |
| Dependencies | deps | 📦 |
| Folder structure | ftree | 🗃️ |
| Work in progress | wip | 🚧 |

---

### 4. Mandatory Execution

For each identified file group, run:

`git add <group-files>`
`git commit -m "emoji prefix: concise description in English"`

Do not ask for confirmation.
Do not explain first.
Do not generate only a suggestion.
**Execute it.**

---

### 5. Reference Examples

`🐛 fix(server): ensure only one achievement is unlocked at once`
`📑 interface: add AchievementsRepository`
`✨ use case: list all challenges`
`🧪 test: list all challenges use case`

---

### 6. Final Verification (Before each commit)

* short and direct message
* emoji matches the prefix
* prefix exists in the table
* description is in English
* correctly represents the group

---

### 7. Required Output Format

Show only executed commands:

```text
EXECUTING:
git add src/domain/user.ts
git commit -m "🌐 domain: add user aggregate"
```

No long explanations.
No “suggestions”.
Do not stop before committing.

---

If you want, I can also adapt this prompt specifically for **gh agent**, **codex**, or **serena**, because each one follows different execution triggers.
