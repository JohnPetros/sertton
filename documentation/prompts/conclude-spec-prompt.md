---
description: Finalize a technical spec implementation and prepare it for PR creation.
---

# Prompt: Conclude Spec

**Objective:**
Finalize and consolidate the implementation of a technical Spec, ensuring that the code is polished, documented, validated, and ready for Pull Request creation.

**Input:**
* **Technical Spec:** The document that guided the implementation (`documentation/features/.../specs/...`).
* **Implemented Code:** The changes made in the UI, Core, Rest, and Drivers layers.

**Execution Guidelines:**

1. **Final Quality Validation:**
    * **Static Analysis:** Run `flutter analyze` across the whole project to ensure there are no remaining warnings or errors.
    * **Unit Tests:** Run `flutter test` to validate that all tests (new and existing) are passing.
    * **Formatting:** Ensure all files follow Dart formatting with `dart format .`.
    * **Coding Guidelines:** Ensure all files follow `documentation\rules\code-conventions-rules.md`.

2. **Requirement Verification:**
    * Compare the final code with each section of the Spec (what must be created/modified).
    * Make sure all described components were implemented as planned.

3. **Documentation and Visualization Updates:**
    * Refine the original Spec document to reflect last-minute design decisions or path changes.
    * Read the PRD associated with the Spec (the file one level above the spec directory) and update it to reflect the implemented changes. The PRD is a link to the milestone on GitHub, so use GitHub CLI to read/update the milestone.
    * **ASCII Diagrams:** Evaluate whether the implemented changes affected complex flows or navigation.
        * **Action:** Generate or update an ASCII diagram (data flow or sequence) to make the final implementation easier to visualize.
        * Use `ASCII` notation inside dedicated code blocks.

4. **Generate Final Summary:**
    * Provide a technical summary of what was completed to support creation of the next PR.
