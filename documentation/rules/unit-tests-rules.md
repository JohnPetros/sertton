# Unit and Widget Test Guidelines

This document describes the practices, patterns, and conventions adopted for automated tests in the project, based on the analysis of existing tests (for example `products-list`).

## 1. Technologies and Dependencies

The main libraries used for testing are:

* **flutter_test**: Flutter’s default testing framework.
* **mocktail**: For creating strict mocks, stubs, and verifications.
* **flutter_riverpod**: For dependency injection and state control in tests.
* **signals_flutter**: For reactive state management (testing `Signal` values).
* **network_image_mock**: To handle `Image.network` in widget tests without real requests.
* **shadcn_flutter**: The UI library in use (tests should include `ShadcnApp` components when necessary).

## 2. Naming Conventions

* **Test Files**: Must end with `_test.dart` and be mirrored under `test/`, following the same directory structure as `lib/`.
    * Example: `lib/.../product_list_view.dart` -> `test/.../product_list_view_test.dart`.
* **Mock Classes**: Must be prefixed with `Mock`, extend `Mock` (from mocktail), and implement the original class/interface.
    * Example: `class MockProductsListPresenter extends Mock implements ProductsListPresenter {}`.
* **Test Descriptions**: Must follow the pattern `should [expected behavior] when [scenario/context]` (in English) or clearly describe the behavior.
    * Example: `'should show skeletons when initial loading'`.

## 3. Test Structure

### 3.1. Setup

* Use `setUp` to instantiate mocks and define repeated default behavior (stubs).
* Declare variables in the `main` or `group` scope and initialize them in `setUp`.

```dart
late MockProductsListPresenter presenter;

setUp(() {
  presenter = MockProductsListPresenter();
  // Default setup for signals and methods
  when(() => presenter.isLoading).thenReturn(signal(false));
  when(() => presenter.products).thenReturn(signal([]));
  // ...
});
```

### 3.2. Grouping

* Use `group('ClassName/FeatureName', () { ... })` to organize related tests, especially for unit tests of logic (Presenters/Controllers).

## 4. Widget Tests

### 4.1. Widget Setup

* Create a helper function `createWidget` (or similar) to encapsulate widget environment setup (Providers, Theme, App Wrapper).
* Use `ProviderScope` to override real providers with mocks.

```dart
Widget createWidget() {
  return ShadcnApp(
    home: ProviderScope(
      overrides: [
        presenterProvider.overrideWithValue(presenter) // Mock injection
      ],
      child: const ProductListView(),
    ),
  );
}
```

### 4.2. Network Image Mocks

* Always wrap `pumpWidget` with `mockNetworkImagesFor` if the widget or its children render internet images.

```dart
await mockNetworkImagesFor(() async {
  await tester.pumpWidget(createWidget());
});
```

### 4.3. Assertions and Interactions

* Verify widget presence by type (`find.byType`) or text (`find.text`).
* Verify widget absence (`findsNothing`) to ensure invalid states are not visible.
* Simulate user interactions:
    * **Tap**: `await tester.tap(...)`
    * **Scroll**: `await tester.drag(...)`
    * **Pull to Refresh**: `await tester.fling(...)` and wait for the animation (`pump`).
* Verify Presenter/Controller methods were called using `verify`.

## 5. Unit Tests (Presenters/Logic)

### 5.1. Testing Signals and State

* When testing classes that use `Signals`, check the current signal value (`.value`).
* Use `when(...).thenReturn(signal(value))` for stubbing Signal properties.
* For async methods that return no value (`void`), use `.thenAnswer((_) async {})`.

### 5.2. Testing Async Initialization

* If initialization logic runs in the constructor or immediately after instantiation, you may need to wait for an event cycle (`Future.delayed(Duration.zero)`) so pending work completes before assertions.

```dart
final presenter = ProductsListPresenter(service);
// Wait for initial execution
await Future.delayed(Duration.zero);
expect(presenter.products.value, isNotEmpty);
```

### 5.3. Fakers

* Use `Faker` classes (such as `ProductFaker`) to generate test data (DTOs), avoiding manual creation of complex objects and keeping tests cleaner.

### 5.4. Behavior Verification

* Use `verify(() => mock.method()).called(n)` to ensure dependencies (services, repositories) were called correctly.
* Use `verifyNever(() => mock.method())` to ensure invalid flows were not triggered.
