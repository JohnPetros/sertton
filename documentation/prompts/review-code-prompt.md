---
description: Review code for bugs, standard violations, and static analysis issues.
---

# Review Code Skill

**Objective:**
Perform a rigorous technical review of the codebase to ensure compliance with project standards, identify latent bugs, and maintain static analysis integrity (no-warnings policy).

**Input:**
* **Context:** Spec that was just implemented (optional).
* **Target:** The entire project or specific provided paths.

**Execution Guidelines:**

1. **Spec and Logic Verification:**
    * **Compliance:** Verify that the spec was correctly implemented, respecting all defined requirements.
    * **Manual Scan:** Look for typos, logic errors, naming issues, and obvious syntax mistakes.

2. **Static Quality Analysis:**
    * **Diagnosis:** Run the **Dart MCP** `analyze_files` tool to list errors, warnings, and coding inconsistencies.
    * **Prioritization:** Examine the severity of reported problems to plan the correction order, prioritizing critical compilation errors.

3. **Automated Fixing:**
    * **Quick Fixes:** Apply the **Dart MCP** `dart_fix` tool to automatically resolve rule violations that have quick fixes.
    * **Verification:** Review the changes made by `dart_fix` to ensure code semantics were preserved.

4. **Refactoring and Alignment with Protocols:**
    * **Manual:** Manually fix the remaining issues that automated tools could not solve.
    * **Guidelines:** Strictly follow the documented project standards:
        * **Coding conventions:** [code-conventions-rules.md](../rules/code-conventions-rules.md)
        * **Architecture:** [architecture.md](../architecture.md)
        * **Core:** [core-layer-rules.md](../rules/core-layer-rules.md)
        * **Rest:** [rest-layer-rules.md](../rules/rest-layer-rules.md)
        * **UI:** [ui-layer-rules.md](../rules/ui-layer-rules.md)
        * **Tests:** [unit-tests-rules.md](../rules/unit-tests-rules.md)
    * **Patterns:** Ensure correct use of MVP, dependency injection with Riverpod, and reactivity with Signals.

5. **Final Validation:**
    * **Tests:** Run `flutter test` to validate that the changes did not affect the system’s functional behavior.
    * **Certification:** Run a final round of `analyze_files` to confirm the code is in a clean state.

**Success Criteria:**
The review is considered complete when static analysis returns **"No issues found"** and all relevant automated tests pass successfully.
