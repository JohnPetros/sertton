---
description: Finalize a bug report after the fix is implemented and validated.
---

# Prompt: Conclude Bug Report

**Objective:**
Finalize and consolidate a reported bug fix, ensuring that the bug has been properly mitigated, that new tests have been added (when applicable), and that the solution respects the project architecture.

**Input:**
* **Bug Report:** The original report document
* **Fixed Code:** The changes made to solve the problem.

**Execution Guidelines:**

1. **Final Fix Validation:**
    * **Regression Tests:** Run `run_tests` to validate that the bug was fixed and the system remains stable.
    * **Error Scenarios:** Ensure unit tests were added for the specific bug case so it does not return (test-first approach for bugs).

2. **Standards and Architecture Verification:**
    * **Respect the Layers:** Validate whether the fix respects the rules (`core-layer-rules.md`, `ui-layer-rules.md`, etc.) and whether it is in the correct layer identified during diagnosis.

3. **Bug Report Update:**
    * Update the Bug Report status or add notes about the final resolution.
    * If the root cause identified during implementation differs from the original one, document that discovery.
