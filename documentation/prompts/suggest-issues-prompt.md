---
description: Suggest implementation issues from a GitHub milestone-based PRD.
---

# Prompt: Suggest Issues

**Objective:**

Suggest issues for the project based on a PRD.

**Input:**
- Project PRD link

**Execution Guidelines:**

1. Use GitHub CLI to retrieve the provided PRD, which is stored as a milestone on GitHub.
2. Read the provided PRD and understand the described requirements and features.
3. Suggest issues for the project based on the PRD and the project context and architecture.

The feature can usually fit into a single issue, but if it is too large, split it into different issues.

## Objective
<!-- What does this issue aim to achieve? What is the expected result? -->

## Requirements
- Requirement 1
- Requirement 2
- Requirement 3

## Business Rules
<!-- Conditions, exceptions, scenarios, important validations -->

## UX/UI (if applicable)
<!-- Figma links, screenshots, expected behavior -->

> Link the issue to a provided milestone
