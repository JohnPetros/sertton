---
name: shadcn-flutter
description: Build modern Flutter applications using shadcn_flutter - a comprehensive UI component library with 84+ production-ready components including forms with type-safe validation, responsive theming, dialogs, tables, color pickers, and more. Covers proper app setup, semantic component naming, extension methods for styling, and Flutter-specific patterns for building dashboards, mobile apps, and web interfaces.
---

# shadcn_flutter Skill

## Purpose
This skill enables Claude to build complete, production-ready Flutter applications using the shadcn_flutter UI component library. Use this skill when users request Flutter UIs, mobile/web apps, dashboards, forms, or any Flutter development task that would benefit from a modern, customizable component library.

## When to Use This Skill
- User asks to build/create a Flutter application or widget
- User mentions Flutter, Dart, or mobile/web app development
- User requests UI components like buttons, forms, cards, dialogs, tables
- User wants to implement themes, dark mode, or responsive design
- User needs form validation, color pickers, or data tables

## Core Principles

### 1. Always Start with Proper App Setup
Every shadcn_flutter app needs the `ShadcnApp` wrapper with theme configuration:

```dart
import 'package:shadcn_flutter/shadcn_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ShadcnApp(
      theme: ThemeData(
        colorScheme: ColorSchemes.lightDefaultColor,
        radius: 0.5,
        scaling: 1,
        typography: const Typography.geist(),
      ),
      darkTheme: ThemeData.dark(
        colorScheme: ColorSchemes.darkDefaultColor,
        radius: 0.5,
      ),
      themeMode: ThemeMode.system,
      home: const HomePage(),
    );
  }
}
```

### 2. Use Semantic Component Names
shadcn_flutter uses clear, semantic names:
- `PrimaryButton`, `OutlineButton`, `GhostButton` (NOT `ElevatedButton`)
- `Card` with padding parameter (NOT `Material` or `Container`)
- `TextField` with `placeholder` (NOT `hintText`)
- `Gap(16)` for spacing (NOT `SizedBox`)

### 3. Leverage Extension Methods for Styling
Use fluent extension methods instead of TextStyle wrappers:
```dart
const Text('Title').semiBold().large()
const Text('Subtitle').muted().small()
```

Available extensions:
- Text size: `.small()`, `.large()`, `.xLarge()`
- Text weight: `.semiBold()`, `.bold()`, `.light()`
- Text color: `.muted()`, `.subtle()`
- Layout: `.withPadding()`, `.sized()`, `.intrinsic()`

### 4. Forms Are Type-Safe with Keys
Always use strongly-typed form keys and validation:

```dart
final _usernameKey = const TextFieldKey('username');

FormField(
  key: _usernameKey,
  label: const Text('Username'),
  validator: const LengthValidator(min: 4),
  child: const TextField(),
)

// In onSubmit:
String? username = _usernameKey[values];
```

## Component Categories

### Buttons
```dart
// Primary action
PrimaryButton(
  onPressed: () {},
  leading: const Icon(Icons.add),
  child: const Text('Add Item'),
)

// Secondary action
OutlineButton(
  onPressed: () {},
  child: const Text('Cancel'),
)

// Tertiary action
GhostButton(
  onPressed: () {},
  child: const Text('View Details'),
)

// Disabled state
PrimaryButton(
  onPressed: null,
  child: const Text('Disabled'),
)
```

### Cards & Containers
```dart
Card(
  padding: const EdgeInsets.all(24),
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Text('Card Title').semiBold(),
      const Gap(4),
      const Text('Card description').muted().small(),
      const Gap(16),
      // Content here
    ],
  ),
).intrinsic() // Makes card fit content
```

### Forms with Validation
```dart
class MyForm extends StatefulWidget {
  @override
  State<MyForm> createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final _emailKey = const TextFieldKey('email');
  final _passwordKey = const TextFieldKey('password');

  @override
  Widget build(BuildContext context) {
    return Form(
      onSubmit: (context, values) {
        String? email = _emailKey[values];
        String? password = _passwordKey[values];
        // Handle submission
      },
      child: Column(
        children: [
          FormTableLayout(
            rows: [
              FormField(
                key: _emailKey,
                label: const Text('Email'),
                hint: const Text('Enter your email address'),
                validator: const EmailValidator(),
                child: const TextField(),
              ),
              FormField(
                key: _passwordKey,
                label: const Text('Password'),
                validator: const LengthValidator(min: 8),
                child: const TextField(obscureText: true),
              ),
            ],
          ),
          const Gap(24),
          FormErrorBuilder(
            builder: (context, errors, child) {
              return PrimaryButton(
                onPressed: errors.isEmpty ? () => context.submitForm() : null,
                child: const Text('Submit'),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

### Dialogs
```dart
showDialog(
  context: context,
  builder: (context) {
    return AlertDialog(
      title: const Text('Confirm Action'),
      content: const Text('Are you sure you want to proceed?'),
      actions: [
        OutlineButton(
          onPressed: () => Navigator.of(context).pop(false),
          child: const Text('Cancel'),
        ),
        PrimaryButton(
          onPressed: () => Navigator.of(context).pop(true),
          child: const Text('Confirm'),
        ),
      ],
    );
  },
);
```

### Select Dropdowns
```dart
class MySelector extends StatefulWidget {
  @override
  State<MySelector> createState() => _MySelectorState();
}

class _MySelectorState extends State<MySelector> {
  String? selectedValue;

  @override
  Widget build(BuildContext context) {
    return Select<String>(
      itemBuilder: (context, item) => Text(item),
      onChanged: (value) => setState(() => selectedValue = value),
      value: selectedValue,
      placeholder: const Text('Select an option'),
      popup: const SelectPopup(
        items: SelectItemList(
          children: [
            SelectItemButton(value: 'option1', child: Text('Option 1')),
            SelectItemButton(value: 'option2', child: Text('Option 2')),
            SelectItemButton(value: 'option3', child: Text('Option 3')),
          ],
        ),
      ),
    );
  }
}
```

### Tabs
```dart
class TabbedView extends StatefulWidget {
  @override
  State<TabbedView> createState() => _TabbedViewState();
}

class _TabbedViewState extends State<TabbedView> {
  int index = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Tabs(
          index: index,
          onChanged: (value) => setState(() => index = value),
          children: const [
            TabItem(child: Text('Tab 1')),
            TabItem(child: Text('Tab 2')),
            TabItem(child: Text('Tab 3')),
          ],
        ),
        const Gap(16),
        IndexedStack(
          index: index,
          children: [
            Card(child: const Text('Content 1')),
            Card(child: const Text('Content 2')),
            Card(child: const Text('Content 3')),
          ],
        ),
      ],
    );
  }
}
```

### Tables
```dart
Table(
  rows: [
    // Header row
    TableRow(
      cells: [
        TableCell(
          child: const Text('Name').muted().semiBold().withPadding(all: 8),
        ),
        TableCell(
          child: const Text('Status').muted().semiBold().withPadding(all: 8),
        ),
        TableCell(
          child: const Text('Amount').muted().semiBold().withPadding(all: 8),
        ),
      ],
    ),
    // Data rows
    TableRow(
      cells: [
        TableCell(child: const Text('John Doe').withPadding(all: 8)),
        TableCell(child: const Text('Active').withPadding(all: 8)),
        TableCell(child: const Text('\$100').withPadding(all: 8)),
      ],
    ),
    // Footer row
    TableFooter(
      cells: [
        TableCell(
          columnSpan: 3,
          child: Row(
            children: [
              const Text('Total'),
              const Spacer(),
              const Text('\$100').semiBold(),
            ],
          ).withPadding(all: 8),
        ),
      ],
    ),
  ],
)
```

### Toast Notifications
```dart
showToast(
  context: context,
  builder: (context, overlay) {
    return SurfaceCard(
      child: Basic(
        title: const Text('Success'),
        subtitle: const Text('Your changes have been saved'),
        trailing: PrimaryButton(
          size: ButtonSize.small,
          onPressed: overlay.close,
          child: const Text('Dismiss'),
        ),
      ),
    );
  },
  location: ToastLocation.bottomRight,
  duration: const Duration(seconds: 3),
);
```

### Color Picker
```dart
class ColorSelector extends StatefulWidget {
  @override
  State<ColorSelector> createState() => _ColorSelectorState();
}

class _ColorSelectorState extends State<ColorSelector> {
  Color selectedColor = Colors.blue;

  @override
  Widget build(BuildContext context) {
    return ColorInput(
      value: selectedColor,
      onChanged: (color) => setState(() => selectedColor = color),
      enableEyeDropper: true,
      showLabel: true,
    );
  }
}
```

### Toggle & Switch
```dart
class ToggleExample extends StatefulWidget {
  @override
  State<ToggleExample> createState() => _ToggleExampleState();
}

class _ToggleExampleState extends State<ToggleExample> {
  final controller = ToggleController(false);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ControlledToggle(
          controller: controller,
          child: const Text('Enable feature'),
        ),
        Switch(
          value: controller.value,
          onChanged: (value) => controller.value = value,
        ),
      ],
    );
  }
}
```

## Theme Customization

### Custom Theme
```dart
final customTheme = ThemeData(
  colorScheme: ColorSchemes.lightDefaultColor,
  radius: 0.5,        // Border radius multiplier
  scaling: 1,         // Size scaling factor
  typography: const Typography.geist(),
  surfaceOpacity: 0.8,
  surfaceBlur: 10.0,
);

// Access theme in widgets
final theme = Theme.of(context);
final primaryColor = theme.colorScheme.primary;
final borderRadius = theme.borderRadiusLg; // 16px at normal radius
final titleStyle = theme.typography.h1;
```

### Responsive Scaling
```dart
AdaptiveScaler(
  scaling: AdaptiveScaler.defaultScaling(Theme.of(context)),
  child: YourWidget(),
)

// Custom scaling
AdaptiveScaler(
  scaling: const AdaptiveScaling.only(
    radiusScaling: 1.5,
    sizeScaling: 1.2,
    textScaling: 1.1,
  ),
  child: YourWidget(),
)
```

## Best Practices

### 1. Structure Your Code
```dart
// Good: Clear widget hierarchy
class DashboardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildHeader(),
        const Gap(24),
        _buildContent(),
      ],
    );
  }

  Widget _buildHeader() {
    return Card(
      child: const Text('Dashboard').large().semiBold(),
    );
  }

  Widget _buildContent() {
    return Card(
      child: // Content
    );
  }
}
```

### 2. Use Stateful Widgets for Interactive Components
```dart
// Good: State management for forms, selects, toggles
class InteractiveForm extends StatefulWidget {
  @override
  State<InteractiveForm> createState() => _InteractiveFormState();
}

class _InteractiveFormState extends State<InteractiveForm> {
  String? selectedValue;
  bool isEnabled = false;

  @override
  Widget build(BuildContext context) {
    // Build UI with state
  }
}
```

### 3. Leverage FormTableLayout for Forms
```dart
// Good: Consistent form layout
FormTableLayout(
  rows: [
    FormField(
      key: key1,
      label: const Text('Field 1'),
      child: const TextField(),
    ),
    FormField(
      key: key2,
      label: const Text('Field 2'),
      child: const TextField(),
    ),
  ],
)
```

### 4. Handle Loading and Error States
```dart
class DataView extends StatelessWidget {
  final bool isLoading;
  final String? error;
  final List<Item> data;

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    
    if (error != null) {
      return Card(
        child: Text('Error: $error').muted(),
      );
    }
    
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) => Card(
        child: Text(data[index].name),
      ),
    );
  }
}
```

## Common Patterns

### Master-Detail Layout
```dart
class MasterDetailView extends StatefulWidget {
  @override
  State<MasterDetailView> createState() => _MasterDetailViewState();
}

class _MasterDetailViewState extends State<MasterDetailView> {
  int? selectedIndex;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // Master list
        Expanded(
          flex: 1,
          child: ListView.builder(
            itemCount: items.length,
            itemBuilder: (context, index) {
              return GhostButton(
                onPressed: () => setState(() => selectedIndex = index),
                child: Text(items[index].title),
              );
            },
          ),
        ),
        const Gap(16),
        // Detail view
        Expanded(
          flex: 2,
          child: selectedIndex != null
              ? Card(child: Text(items[selectedIndex!].details))
              : Card(child: const Text('Select an item').muted()),
        ),
      ],
    );
  }
}
```

### Settings Screen
```dart
class SettingsScreen extends StatefulWidget {
  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool notificationsEnabled = true;
  String theme = 'system';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Card(
          child: Column(
            children: [
              const Text('Preferences').semiBold().large(),
              const Gap(16),
              Row(
                children: [
                  const Text('Enable Notifications'),
                  const Spacer(),
                  Switch(
                    value: notificationsEnabled,
                    onChanged: (value) {
                      setState(() => notificationsEnabled = value);
                    },
                  ),
                ],
              ),
              const Gap(8),
              Row(
                children: [
                  const Text('Theme'),
                  const Spacer(),
                  Select<String>(
                    value: theme,
                    onChanged: (value) => setState(() => theme = value!),
                    itemBuilder: (context, item) => Text(item),
                    popup: const SelectPopup(
                      items: SelectItemList(
                        children: [
                          SelectItemButton(value: 'light', child: Text('Light')),
                          SelectItemButton(value: 'dark', child: Text('Dark')),
                          SelectItemButton(value: 'system', child: Text('System')),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

## Quick Reference

### Spacing
- `Gap(4)` - Extra small
- `Gap(8)` - Small
- `Gap(16)` - Medium (default)
- `Gap(24)` - Large
- `Gap(32)` - Extra large

### Validators
- `LengthValidator(min: 4, max: 20)`
- `EmailValidator()`
- `CompareWith.equal(otherKey, message: '...')`
- Custom: Implement `FormFieldValidator<T>`

### Button Sizes
- `ButtonSize.small`
- `ButtonSize.medium` (default)
- `ButtonSize.large`

### Toast Locations
- `ToastLocation.topLeft`
- `ToastLocation.topCenter`
- `ToastLocation.topRight`
- `ToastLocation.bottomLeft`
- `ToastLocation.bottomCenter`
- `ToastLocation.bottomRight`

## Implementation Checklist

When building a shadcn_flutter app, ensure:

1. ✅ App wrapped in `ShadcnApp` with theme configuration
2. ✅ Import statement: `import 'package:shadcn_flutter/shadcn_flutter.dart';`
3. ✅ Use semantic component names (PrimaryButton, not ElevatedButton)
4. ✅ Forms use typed keys and FormTableLayout
5. ✅ Spacing with `Gap()` instead of SizedBox
6. ✅ Text styling with extension methods (`.semiBold()`, `.muted()`)
7. ✅ Cards use `padding` parameter
8. ✅ TextFields use `placeholder` instead of decoration
9. ✅ Proper state management with StatefulWidget where needed
10. ✅ Theme access via `Theme.of(context)`

## Summary

shadcn_flutter is a comprehensive UI library that prioritizes developer experience with semantic naming, type-safe forms, and extensive theming. Always start with proper app setup, use the library's semantic component names, leverage extension methods for quick styling, and implement type-safe forms with validation. The library works best when you embrace its conventions rather than fighting against them with Material/Cupertino patterns.
