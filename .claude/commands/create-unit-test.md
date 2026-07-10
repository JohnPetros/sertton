---
description: Create unit and widget tests that follow the project's testing standards.
---

# Create Unit/Widget Test Skill

**Objective:**
Guide the creation of standardized and efficient unit and widget tests, ensuring logical integrity in Presenters and visual/functional fidelity in Widgets.

**Input:**
* **Source Code:** The `Widget` (View) file and its corresponding `Presenter`.

---

## Execution Guidelines

### 1. Adherence to Project Standards
* **Required:** Strictly follow the guidelines in [unit-tests-rules.md](../rules/unit-tests-rules.md).
* **UI Context:** When testing Widgets, apply the best practices described in [ui-layer-rules.md](../rules/ui-layer-rules.md).

### 2. Structure and Naming
* **Organization:** Create tests in the `test/` directory, mirroring the original structure in `lib/`.
* **Naming Pattern:**
    * **Views:** `name_view_test.dart`
    * **Presenters:** `name_presenter_test.dart`
    * *Example:* `lib/ui/home/home_view.dart` -> `test/ui/home/home_view_test.dart`.

### 3. Data Preparation (Fakers)
* **Use Fakers:** Use `Faker` classes to instantiate DTOs and models. This ensures consistent data and easier maintenance.
* **Proactive Action:** If a `Faker` for a specific DTO does not exist, **create it first** in `test/fakers/<module>/`.
* **Location:** Keep fakers organized in the matching folder structure under `test/fakers/`.

### 4. Test Strategy (Bottom-Up)
* **Widget Hierarchy:** When testing a widget composed of other sub-widgets, follow the order **from the innermost to the outermost**.
* **Isolation:** Ensure smaller components are validated before testing integration in the parent component.

### 5. Scope and Coverage
* **Widget/Presenter Duality:** If a visual component is provided, it is mandatory to create tests for both the **View** (interactions and rendering) and the **Presenter** (state logic).
* **Complex Components:** Complex subcomponents must have their own dedicated test files.

### 6. Quality and Clean Code
* **Self-Explanatory Code:** Test code should be readable on its own. **Do not include unnecessary comments**; use descriptive test names.
* **Mocks:** Use `mocktail` to create test doubles, following the project standard.

### 7. Test Execution

* **Required:** Run the newly created tests with `flutter test` and verify that they all pass. At the end, run all project tests to ensure there were no regressions.
