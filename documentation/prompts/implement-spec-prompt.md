---
description: Implement an approved technical spec iteratively with validation at each step.
---

# Prompt: Implement Spec

**Objective:**
Execute the technical implementation plan iteratively, in an organized and validated way, ensuring quality and continuous integration.

**Input:**
* Approved/finalized technical Spec document.

**Execution Guidelines:**

1. **Validate Guidelines and Architecture:**
    Before starting implementation, make sure you understand the project guidelines and structure:
    * **Project macro view:** `documentation\overview.md`
    * **Architecture:** `documentation\architecture.md`
    * **Code Standardization:** `documentation\rules\code-conventions-rules.md`
    * **Layer Guidelines:**
        * **Core:** `documentation\rules\core-layer-rules.md`
        * **UI:** `documentation\rules\ui-layer-rules.md`
        * **REST:** `documentation\rules\rest-layer-rules.md`
        * **Drivers:** `documentation\rules\drivers-layer-rules.md`

2. **Planning and Tasks:**
    * If planning and task definition were already done earlier, consider them during implementation and ignore steps 3 and 4.

3. **Atomic Decomposition:**
    * Break the implementation plan into phases and atomic tasks.
    * Each phase must result in code that is compilable and functional in isolation.

4. **Execution Order (Bottom-Up):**
    Implement tasks by strictly following dependency hierarchy:
    1. **Core:** DTOs and interfaces.
    2. **Rest:** Implementations of Rest service interfaces.
    3. **Drivers:** Implementations of driver interfaces.
    4. **State Management:** Stores (Signals), Presenters, Controllers.
    5. **User Interface:** Views and Widgets.
    * **Rule:** Never implement a consuming component (for example a Widget) before implementing the logic/data it consumes.

5. **Quality and Verification Cycle (Per Task):**
    After finishing the code for *each micro-task*, execute the validation steps BEFORE moving to the next one using the Dart MCP:
    * **Formatting:** Run `dart format .`
    * **Static Analysis:** Run `flutter analyze`.
    * **Test Analysis:** Run `flutter test`.
    * **Acceptance Criteria:** Immediately fix any linter errors or recommendations, and also fix test errors. Do not move forward with "dirty" code.

6. **Standards Consistency:**
    * **UI Layer:**
        * Whenever you create an internal widget, create a dedicated folder for it inside the parent widget structure.
        * Always use the MVP (Model-View-Presenter) pattern when creating widgets.
        * **Important:** Use only `shadcn_flutter` for UI components, avoiding `Material UI`.
