---
description: Update the architecture document to reflect current code and decisions.
---

# Prompt: Architecture Update

**Objective:**
Keep the project architecture document (`documentation/architecture.md`) up to date, ensuring that it accurately reflects structural decisions, design patterns, adopted technologies, and code organization.

**Inputs:**
1. Product Requirements Documents (PRDs) and Technical Specifications (Specs).
    * *Note:* all Spec files use the `-spec.md` extension.
2. Guideline documents.
    * Example: `documentation/rules/*-rules.md` (such as `ui-layer-rules.md`, `core-layer-rules.md`, etc.).
3. Significant source code changes (new layers, refactors, introduced packages).
4. The current `documentation/architecture.md` file.

**Execution Guidelines:**

1. **Impact Analysis:**
    * **PRDs/Specs:** Evaluate whether they introduce new domains, components, or technology needs.
    * **Guidelines:** Check whether new guidelines change existing architectural patterns (for example a new way to handle errors, a new mandatory folder structure).
    * **Code:** Verify whether code changes respect the boundaries defined in the current architecture or require a documentation update (architecture evolution).

2. **Critical Section Updates:**
    * **Overview and Diagrams:** Update ASCII diagrams if there are changes in data flow or layer relationships.
    * **Domain Modules:** Add new modules or update the DTOs listed in the bounded-context table.
    * **Tech Stack:** Keep dependency versions updated according to `pubspec.yaml` and document new key libraries.
    * **Layers (UI, Core, Rest, Drivers):** Reflect changes in folder structure or responsibilities of each layer. If new patterns are adopted (for example switching from MVP to MVVM), update explanations and code examples.
    * **Directory Structure:** Keep the directory tree at the end of the document synchronized with the real project structure.

3. **Consistency Validation:**
    * Ensure that code examples in the architecture document compile or are syntactically correct and representative of the real code.
    * Check whether the "Pitfalls to Avoid" section is still relevant or whether new lessons learned should be added.
