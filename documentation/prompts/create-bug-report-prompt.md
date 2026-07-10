---
description: Turn an informal bug description into a clear, actionable bug report for the Sertton project.
---

# Prompt: Create Bug Report

**Objective:** Convert an informal problem report into a professional, implementation-oriented bug report that the Sertton team can use without extra interpretation.

The result of this task is always a single Markdown file containing only the bug report.

This prompt does **not** create a fix spec. If a spec is needed later, it must be created in a separate flow with `documentation/prompts/create-spec-prompt.md`.

---

## Input

- Informal bug description
- Optional technical context:
  - device or platform
  - environment
  - affected feature or flow
  - screenshots, logs, or reproduction notes

---

## Project Context

Sertton is a Flutter/Dart e-commerce app with these layers:

- `lib/core/`
- `lib/rest/`
- `lib/drivers/`
- `lib/ui/`

Before writing the report, align with:

- `documentation/overview.md`
- `documentation/architecture.md`
- `documentation/rules/rules.md`

Use the codebase to ground the diagnosis in real files and real flow ownership.

---

## Execution Guidelines

### 1. Analyze the report

Translate the informal description into:

- observed behavior
- expected behavior
- impact on the user flow

Remove ambiguity wherever possible.

### 2. Diagnose probable causes

Based on the architecture and codebase, identify:

- likely failure points
- the data source involved
- the layer where the issue appears to originate
- any missing validation, mapping, state handling, or integration step

Search for real files involved in the flow, such as:

- widgets or screens where the flow starts
- presenters or providers that manage state
- service interfaces in `core`
- Yampi implementations and mappers in `rest`
- infrastructure adapters in `drivers`

### 3. Map the impacted layers

Use only the real repository layers:

- `core`
- `rest`
- `drivers`
- `ui`

Associate each diagnosis point with real file paths whenever possible.

### 4. Provide a fix direction

Include only a short technical direction:

- where the fix most likely belongs
- which files or layers are relevant
- what kind of correction is likely needed

Do not turn this into an implementation plan or technical spec.

### 5. Save and stop

After saving the bug report:

- report the file path created or updated
- do not create a spec
- do not edit any file in `specs/`

---

## Output File

Save a single file to:

- `documentation/features/{domain}/reports/{descriptive-name}-bug-report.md`

---

## Required Template

```md
---
title: <short descriptive title>
domain: <catalog|checkout|marketing|reviewing|shipping|global|institutional|other>
status: open
last_updated_at: <YYYY-MM-DD>
source: <issue, request, or report reference>
---

# Bug Report: <short descriptive title>

## Observed Behavior

<Objective description of what is going wrong>

## Expected Behavior

<What should happen instead>

## Impact

<Who is affected and how this impacts the product or flow>

## Probable Causes

- <probable cause>
- <probable cause>

## Context and Analysis

### UI
- **File:** `path/to/file.dart`
- **Diagnosis:** <what appears incorrect here>

### Core
- **File:** `path/to/file.dart`
- **Diagnosis:** <what appears incorrect here>

### Rest
- **File:** `path/to/file.dart`
- **Diagnosis:** <what appears incorrect here>

### Drivers
- **File:** `path/to/file.dart`
- **Diagnosis:** <what appears incorrect here>

> Omit any layer section that does not apply.

## Evidence

- <log, screenshot note, reproduction step, or code evidence>

## Fix Direction

<Short paragraph or short bullet list pointing to the most likely correction area without prescribing the full implementation>
```

---

## Restrictions

- Do not invent files, methods, or contracts without evidence in the codebase.
- Separate facts from hypotheses.
- Do not include implementation phases, tasks, or file creation plans.
- Do not embed a fix spec inside the bug report.
- Do not create or update files under `specs/` during this task.
