---
description: Create unit, widget, API integration, and Maestro E2E tests for the Sertton React Native application.
---

# Prompt: Create Tests

## Objective

Create behavior-focused automated tests for the requested feature in sertton-react-native-app.

Select the smallest test layer that can validate each behavior:

- unit tests;
- hook tests;
- widget or screen tests;
- HTTP integration tests;
- Maestro E2E tests.

Do not use E2E tests to replace lower-level coverage.

## Required rules

Before creating or modifying tests:

1. Read documentation/rules.md.
2. Identify the applicable rule documents from its selection table.
3. Read the complete applicable documents before editing:
   - documentation/rules/testing-rules.md for every test task;
   - documentation/rules/ui-layer-rules.md for UI, widget, screen, or hook tasks;
   - documentation/rules/rest-layer-rules.md for REST, controller, API Route, mapper, or Yampi tasks.
4. Follow the referenced rules instead of duplicating their content in this prompt.
5. If the task changes scope, return to documentation/rules.md and load any newly applicable rules.

The rules are the source of truth for test location, naming, fakers, mocks, selectors, API testing, Maestro flows, and validation commands.

## Input

The request may provide:

- a source file, widget, screen, hook, controller, or API Route;
- a feature or user journey;
- expected behavior;
- failing tests;
- a requested test layer.

Inspect the implementation and nearby tests before making changes. Ask for clarification only when ambiguity would materially change the test strategy.

## Planning workflow

Before editing:

1. Identify the unit or user journey under test.
2. List observable states, transitions, and user actions.
3. Map each behavior to the lowest suitable test layer.
4. Identify dependencies that must be isolated.
5. Check for existing fakers, mocks, selectors, and test helpers.
6. Check whether the proposed test path is discovered by the current Jest configuration.
7. Define the targeted and broader validations required.

Create a concise test matrix:

| Behavior | Test layer | Observable assertion |
| --- | --- | --- |
| <behavior> | unit/hook/widget/API/E2E | <expected result> |

## Implementation workflow

1. Inspect analogous source and test files.
2. Create missing fakers, helpers, or stable accessibility selectors when required by the applicable rules.
3. Implement the narrowest test that validates the behavior.
4. Keep the test independent from unrelated infrastructure.
5. Add integration or E2E coverage only when it validates composition or a critical user journey that lower-level tests cannot cover.
6. Preserve existing user changes and avoid unrelated refactors.
7. Run targeted validation after each meaningful change.
8. Run broader validation before completing the task.

## Layer selection guide

### Unit or hook tests

Use for isolated logic, state transitions, effects, validation, service calls, error handling, and navigation decisions.

### Widget or screen tests

Use for rendered states, accessibility, user interactions, event delegation, and relevant child composition.

### Controller or API Route tests

Use for request parsing, schema validation, controller orchestration, response status, error mapping, and route parameters.

### HTTP integration tests

Use when the test must validate the real composition between an Expo API Route, controller, service, and the local Yampi mock server.

### Maestro E2E tests

Use for critical native Android/iOS user journeys involving UI, navigation, Expo API Routes, and the Yampi mock server.

## Validation

Run the validations required by the applicable rule documents.

At minimum, when relevant:

~~~bash
npm test -- --runInBand <affected-test-path>
npm test -- --runInBand
npm run typecheck
npm run codecheck
npm run test:integration
~~~

If a validation cannot run, report:

- the exact command;
- the failure or blocker;
- whether it is caused by the change or the environment;
- which validations completed successfully.

## Completion criteria

The task is complete when:

- every requested behavior has an appropriate test layer;
- all applicable rule documents were read and followed;
- tests are discovered by the configured test runner;
- targeted validation passes;
- broader validation is run or its blocker is documented;
- no unrelated files are changed;
- no temporary test artifacts remain.

## Expected output

Report:

1. Tests created or modified.
2. Behaviors covered and their test layers.
3. Fakers, helpers, or selectors added.
4. Validation commands and results.
5. Remaining limitations or blockers.

