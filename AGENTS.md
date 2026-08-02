# Expo HAS CHANGED

Before writing any code, read these documents:

- `documentation/archtecture.md`
- `documentation/product-overview.md`

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## UI validation

Validate every user-facing UI change with the Maestro MCP before delivery. If no compatible emulator or simulator is available, report the validation blocker explicitly.

## MCP usage

Use MCPs on demand. Select the MCP based on the type of information or validation required, and do not invoke an MCP when the task can be completed reliably from the local codebase and existing project rules.

### Context7

Use Context7 when the task requires current or version-specific documentation for a library, framework, SDK, API, CLI, or cloud service.

Use it for:

- Expo, React Native, Expo Router, Jest, Testing Library, Maestro, or other dependency APIs;
- configuration and setup instructions;
- migration and version-specific behavior;
- official usage examples;
- troubleshooting caused by a library or framework contract.

Workflow:

1. Resolve the library name to a Context7 library ID first.
2. Query the documentation using that exact ID.
3. Keep each query focused on one concept.
4. Include the project or dependency version when it matters.
5. Apply the documented behavior to the installed versions in `package.json`.

Do not use Context7 for searching this repository, refactoring local code, general programming concepts, or debugging business logic that does not depend on external documentation. Never include secrets, credentials, personal data, or proprietary code in a query.

### Playwright

Use Playwright for browser-based validation and web E2E tests. It is appropriate for the Expo web target and browser-accessible API or UI flows.

Use it for:

- opening and navigating web pages;
- interacting with forms, buttons, links, and other browser elements;
- asserting visible content, URL changes, accessibility, and browser behavior;
- taking screenshots when visual verification is relevant;
- reproducing and diagnosing browser-only issues;
- validating a complete web flow against a local server.

Workflow:

1. Start the required local server or web app.
2. Navigate to the target URL.
3. Prefer accessible roles, labels, and stable test IDs over brittle CSS or XPath selectors.
4. Wait for observable conditions instead of using arbitrary delays.
5. Exercise the user action and assert the resulting behavior.
6. Capture a screenshot or trace when diagnosing a visual or timing failure.
7. Close the browser context after the validation is complete.

Do not use Playwright for native iOS/Android flows; use Maestro for those flows. Do not use it as a replacement for unit tests, hook tests, or API contract tests. When a dedicated Playwright MCP is not available, use the configured browser-control or Node/Playwright integration exposed by the environment; do not invent an unavailable tool.
