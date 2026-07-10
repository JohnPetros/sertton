---
description: Create a product requirements document from a draft after clarifying missing details.
---

# Prompt: Create PRD

**Objective:**
Standardize the creation of Product Requirements Documents (PRDs), ensuring technical clarity and alignment between product, design, and development teams.

**Inputs:**
1. Sketch, draft, or feature description.
2. Context information, relevant code, or screenshots.
3. Reference documentation (if any).

---

## EXECUTION INSTRUCTIONS

**You must strictly follow this two-step process:**

### STEP 1: DISCOVERY AND CLARIFICATION (CRITICAL)
**DO NOT GENERATE THE PRD IMMEDIATELY.**
Before writing, analyze the request and ask questions to fill in gaps. Organize the questions into:

1. **Business:** Goals, success metrics, priority.
2. **UX/Design:** Target audience, journey, current pain points.
3. **Technical:** Platforms, integrations, performance, data.

**-> Stop and wait for my answers before continuing.**

### STEP 2: PRD WRITING
After receiving the answers, generate the full document strictly following the template below.

---

## PRD TEMPLATE (Output Structure)

### 1. Overview
*Describe clearly and concisely:*
- What the feature/product is.
- Which problem it solves.
- The main objective and delivered value.

### 2. Functional Requirements
*List the features. Do not use numeric IDs. Use checkboxes for tracking.*

#### [Component/Area Name]
**Description:** Brief context for the component.

* [ ] **[Feature Name]:** Description of the expected action or behavior.
* [ ] **[Feature Name]:** Description of the expected action or behavior.

*(Repeat for all components)*

##### Business Rules
*List logical and behavioral rules (Backend/Logic).*

* **[Rule Name]:** Detailed description of behavior, validations, conditions, triggers, and calculations.
* **[Rule Name]:** Detailed description...

##### UI/UX Rules (if any)
*Specify visual and interaction aspects (Frontend).*

* [ ] **[Visual Element]:** Specification (Colors, Typography, States).
* [ ] **Responsiveness:** Behavior on mobile/desktop.
* [ ] **Accessibility:** Contrast rules and keyboard navigation.
* [ ] **Feedback:** Error, success, and loading-state messages.
* [ ] **Performance:** (Loading and response time).
* [ ] **Security:** (Authentication, data protection).
* [ ] **Reliability:** (Error handling, fallbacks).
* [ ] **Compatibility:** (Browsers, devices).

### 3. User Flow
*Describe the user’s step-by-step path. Split into smaller flows if needed.*

**Flow name:** Brief context for the flow.

1. The user accesses [Screen/Location].
2. The user performs [Action].
3. The system validates [Condition]:
    * **Success:** X happens.
    * **Failure:** Y happens.

### 4. Out of Scope
*What will NOT be developed in this version to avoid scope creep.*
