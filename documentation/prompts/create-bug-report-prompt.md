---
description: Turn an informal bug description into a structured bug report with a fix plan.
---

# Prompt: Create Bug Report

**Objective:**
Transform a sketch or informal error report into a **Professional Bug Report**, standardized and ready to be handed to the development team.

**Input:**
* **Problem Sketch:** report document with only the problem generally described
* **Technical Context (Optional):** [Insert device, OS, app version info, if available]

**Execution Guidelines:**

1. **Report Analysis:** Interpret the problem sketch and the provided technical context.
2. Understand the project architecture using the rules for each layer.
3. **Diagnosis:** Identify probable causes based on the system architecture described in `documentation\architecture.md`. To better understand the feature context, if it exists, review the affected feature’s PRD, located at the root of the bug-reports directory, one level above.
4. **Layer Mapping:** Determine which layers (UI, Core, REST, Drivers) and specific files are involved.
5. **Fix Plan:** Build a step-by-step solution, separated by layers, to guide development.

**Required Output Format:**

Please generate the response inside a Markdown code block, strictly following this template:

```markdown
## 🐛 Bug Report: [Short Descriptive Title]

**Identified Problem:**
[A clear sentence describing the unexpected behavior]

**Causes:**
[Brief explanation of the likely technical reasons for the error]

**Context and Analysis:**
### [Layer Name (for example UI Layer, Core Layer, REST Layer, Drivers Layer)]

<!-- Repeat the block below for each affected layer -->
- File: `[Path/FileName]`
- Diagnosis: [What is specifically wrong in this location]

**Fix Plan (Spec):**

### 1. What already exists? (Context/Impact)
List codebase resources (Services, Widgets, DTOs, Stores, Drivers, etc.) that will be used or impacted. Indicate absolute paths or clear relative paths.

- **[Layer]**:
[Component Name] - [Responsibility]
[Component Name] - [Responsibility]

### 2. What must be created?
Describe new components required for the fix.

- **[Layer]**:
[Component Name] - [Responsibility]
[Component Name] - [Responsibility]

### 3. What must be modified?
List changes to existing code.

- **[Layer]**:
[Component Name] - [Responsibility]
[Component Name] - [Responsibility]

### 4. What must be removed?
List legacy code or cleanup refactors required (if any).

- **[Layer]**:
[Component Name] - [Responsibility]
[Component Name] - [Responsibility]
```
