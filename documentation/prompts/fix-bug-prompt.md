---
description: Implement a bug fix from a bug report with validation after each task.
---

# Prompt: Fix Bug

**Main Objective**
Read the bug report, plan the fix, and implement the changes required to solve the identified problem while ensuring code quality.

**Inputs**
* **Bug Report:** Detailed document describing the problem, root causes, and suggested fix plan.

**Execution Guidelines**

1. **Analysis and Planning**
    * Carefully review the provided Bug Report.
    * Understand the error context, technical impacts, and design decisions involved.
    * Build or refine the fix plan, ensuring compliance with each layer’s architectural guidelines (Core, UI, Drivers, REST).

2. **Task Decomposition**
    * Break the fix plan into atomic, manageable micro-tasks.
    * Each task must have a clear scope and result in compilable code.

3. **Iterative Implementation**
    * Execute each micro-task sequentially.
    * Strictly follow the project’s code and architecture conventions.

4. **Quality and Verification Cycle (Per Task)**
    * After finishing the code for *each micro-task*, execute the validation steps **BEFORE** moving to the next one, using the Dart MCP:
        * **Formatting:** Run `dart format .` to ensure code style.
        * **Static Analysis:** Run `flutter analyze` and fix all errors and warnings (lints).
        * **Tests:** If applicable, run or create tests to validate the fix.
    * **Acceptance Criteria:** Do not move forward with code that has linter errors or compilation failures.

5. **Final Review**
    * Verify that the full solution meets the requirements described in the Bug Report.
    * Confirm that no new side effects were introduced.
