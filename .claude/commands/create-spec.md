---
description: Write a technical spec that bridges a PRD and the implementation details.
---

# Prompt: Create Spec Document

## Objective
Detail the technical implementation of a feature, fix, or refactor while acting as a Senior Tech Lead.
The document must be the bridge between the PRD (Product Requirements Document) and the code, with enough detail for direct implementation and no ambiguity.

## Inputs
- Spec draft or change request.
- Associated PRD (higher level).
- Access to the current codebase.

## Execution Guidelines

### 1) Research and Contextualization
- **Understand the PRD**: Access the associated PRD link (higher level) and understand the goal of the task using GitHub CLI.
- **Map the flow:** understand the origin and destination of the data (`UI -> Store -> Service -> API`) before writing.
- **Check what already exists:** identify existing resources (widgets, DTOs, services) that should be reused or extended; avoid duplication.
- **Consult rules:** review layer standards (`core`, `rest`, `ui`, `drivers`) and stack standards (Riverpod, Signals) according to the scope.
- **Identify references:** locate similar examples in the codebase for smart reuse.
- **Ask questions:** If necessary, ask me questions to better understand the task context or decide technical issues using your `question` tool.

### 2) Structuring the Spec
Generate a Markdown file following exactly the structure below.

## Required Template

### 1. Header (Frontmatter)
```yaml
title: [Spec Title]
status: [done|done|in progress]
lastUpdatedAt: [YYYY-MM-DD]
```

### 2. Objective (Required)
One-paragraph summary of what will be delivered, functionally and technically.

### 3. What already exists? (Required)
For each impacted layer, list existing codebase resources.

Format:
- **`ClassName`** (`relative/file/path.dart`) - *Brief description of its usage (for example method to call, store to consume).*

### 4. What must be created? (When applicable)
Describe new components by layer. For each new file, detail:

#### UI (Presenters, Stores)
- **Location:** `file/path.dart`
- **Dependencies:** what must be injected.
- **Signals/State:** reactive variables (for example `isLoading`, `items`).
- **Computeds:** derived variables (for example `isEmpty`, `totalPrice`).
- **Methods:** signature and responsibility.

#### UI (Views)
- **Location:** `file/path.dart`
- **UI Libraries:** what should be used/injected.
- **Props:** parameters received in the constructor.

#### UI (Widgets)
- **Location:** `folder/path`
- **Props:** parameters received in the constructor.
- **Internal widgets:** list them following the same structure.
- **Folder structure:** represent in ASCII when there are internal widgets.

> Every widget must follow MVP: View and, when there is state/providers, Presenter.
> If the widget has internal widgets, apply the same pattern (Widgets, Views, and Presenters).

#### REST (Services)
- **Location:** `file/path.dart`
- **Dependencies:** what must be injected.
- **Methods:** signature and responsibility.

#### Drivers
- **Location:** `file/path.dart`
- **Dependencies:** what must be injected.
- **Methods:** signature and responsibility.

> Not all layers are mandatory. Choose only the ones required for the task.

### 5. What must be modified? (When applicable)
For changes in existing code:

#### [Layer Name]
- **File:** `file/path.dart`
- **Change:** describe the specific change (for example add `onTap` prop, inject new service).

### 6. What must be removed? (When applicable)

#### [Layer Name]
- **File:** `file/path.dart`
- **Reason:** explain the removal and impact.

### 7. Use as reference (Optional)
- Links/paths to similar files in the codebase.

### 8. Diagrams and References
- **Data flow:** ASCII/text diagram with interaction between layers.
- **Layout:** ASCII of the visual hierarchy for complex screens/widgets.
- **References:** paths to similar files used as a base.

## Validation Checklist
- Required structure followed in full.
- File paths verified in the codebase.
- No duplication of existing components.
- Decisions aligned with layer rules.
