# Development Workflow

## Branch Strategy

Sertton uses a feature-branch workflow based on the `main` branch.

```text
main
  │
  ├── feature/user-filtering
  ├── feature/star-users-dialog
  ├── fix/achievement-unlock
  └── refactor/sortable-column
```

### Branch Naming

| Prefix | Purpose | Example |
| --- | --- | --- |
| `feature/` | New feature | `feature/challenges-table-skeleton` |
| `fix/` | Bug fix | `fix/svg-title-error` |
| `refactor/` | Code improvement | `refactor/period-picker` |
| `docs/` | Documentation updates | `docs/api-endpoints` |

## Commit Convention

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) pattern with emojis and optional scopes.

### Format

```text
<emoji> <prefix>: <message>
```

### Commit Types

| Type | Emoji | Description |
| --- | --- | --- |
| `domain` | 🌐 | Changes in the core layer |
| `rest` | 📶 | Changes in the REST API layer |
| `ui` | 🖥️ | UI components |
| `db` | 💾 | Database changes |
| `interface` | 📑 | Interface definitions |
| `type` | 🏷️ | Type definitions |
| `docs` | 📚 | Documentation |
| `fix` | 🐛 | Bug fixes |
| `refactor` | ♻️ | Refactoring |
| `test` | 🧪 | Tests |
| `config` | ⚙️ | Configuration |
| `validation` | 📮 | Validation schemas |
| `deps` | 📦 | Dependencies |

### Examples

```bash
# With scope
🐛 fix: ensure only one achievement is unlocked at a time

# Without scope
📑 interface: add AchievementsRepository

# Use cases (no verb required)
♻️ refactor: list all challenges
🧪 test: list all challenges use case
```
