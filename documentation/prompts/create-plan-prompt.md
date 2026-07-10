---
description: Convert a technical spec into an atomic bottom-up implementation plan.
---

# Prompt: Create Spec Implementation Plan

**Objective:**
Transform a technical specification into a detailed and organized implementation plan, step by step, to guide development efficiently and systematically.

**Inputs:**
- Technical Spec document
- Project context (architecture, standards, technologies)

**Execution Guidelines:**

## 1. Specification Analysis
- Read and fully understand the provided spec
- Identify functional and non-functional requirements
- Map dependencies between components
- Identify risks and points of attention

## 2. Atomic Decomposition
- Break the phased plan into atomic tasks.
- Each phase must result in code that is compilable and functional on its own.

## 3. Execution Order (Bottom-Up)

Implement tasks by strictly following dependency hierarchy:

1. **Core**: DTOs, domain entities, and repository/service interfaces
2. **Data/Rest**: REST service interface implementations and mappers
3. **Data/Drivers**: Driver interface implementations (LocalStorage, external APIs, etc.)
4. **State Management**: Stores (Signals), Presenters, Controllers, ViewModels
5. **UI**: Views, Widgets, Pages, and visual components

**Fundamental rule:** Never implement a consuming component before implementing the logic/data it consumes.
