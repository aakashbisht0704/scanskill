## Flutter: Core Skills & Architecture

### 1. Best Coding Practices

- **Enforce Immutability:** Use `const` constructors everywhere possible. This drastically reduces garbage collection overhead and prevents unnecessary widget rebuilds, keeping the app rendering at a smooth 60-120 FPS.
- **Decouple Business Logic:** Never place API calls or complex logic directly inside UI widgets. Keep the widget tree strictly focused on rendering state and dispatching events.
- **Master the Widget-Element-RenderObject Pipeline:** Understand that widgets are just immutable configurations. Use `Keys` properly when reordering dynamic lists or maintaining state across heavily mutating widget trees.
- **Implement Strict Linting:** Use `flutter_lints` or `very_good_analysis` to enforce consistent code styling. This catches potential bugs—like missing `await` calls or unhandled futures—at compile time.
- **Graceful Error Handling:** Never let the app crash silently. Implement global error catchers (`PlatformDispatcher.instance.onError`) and use robust `try/catch` blocks to map backend exceptions to user-friendly UI states.

### 2. Directory Structure for Clean Code (Feature-First)

For scalable, multi-tenant platforms, a **Feature-First Clean Architecture** is the industry standard. It isolates modules so complex codebases remain maintainable and multiple developers can work simultaneously without conflicts.

```text
lib/
├── core/                   # App-wide shared resources
│   ├── errors/             # Custom exception classes
│   ├── network/            # Dio clients, global API interceptors
│   ├── theme/              # Color palettes, typography
│   └── utils/              # Helper functions, constants
├── features/               # Feature-based modules
│   ├── authentication/
│   │   ├── data/           # Repositories, DTOs, Local Storage
│   │   ├── domain/         # Entities, Use Cases (Business rules)
│   │   └── presentation/   # UI Widgets, State controllers
│   ├── user_dashboard/     # Isolated feature module
│   └── settings/           # Isolated feature module
└── main.dart               # App entry point & dependency injection setup
```

### 3. Best Design Practices

- **Build a Centralized Design System:** Move away from hardcoded colors and standard Material defaults early on. Define a comprehensive, custom ThemeData class to maintain a strict visual identity across the entire platform.
- **Adaptive & Responsive Layouts:** Use LayoutBuilder and MediaQuery to ensure the UI scales gracefully across mobile, tablet, and web environments. Avoid hardcoded dimensional values.
- **Feedback & Loading States:** Always provide immediate visual feedback. Use skeleton loaders (shimmer effects) for data fetching instead of blocking the screen with infinite spinning circles to improve perceived performance.
- **Accessibility (a11y) by Default:** Ensure sufficient color contrast, define Semantics widgets for screen readers, and support dynamic system font scaling.

### 4. Essential Packages & Libraries

#### Architecture & State Management

- **flutter_riverpod:** The modern, compile-safe standard for state management and dependency injection. Excellent for caching and managing complex asynchronous data streams.
- **flutter_bloc:** The battle-tested, event-driven alternative. Highly recommended for maintaining strict audit trails and predictable state transitions in enterprise environments.
- **freezed & json_serializable:** Essential for generating robust, immutable data models and handling complex JSON parsing safely.

#### Networking & Data

- **dio:** A powerful HTTP client that handles complex routing, global headers (crucial for multi-tenant auth tokens), timeout configurations, and request interceptors much better than the default http package.
- **flutter_secure_storage:** For encrypting and securely storing sensitive data like authentication tokens and session keys on the device.

#### Validation & Forms

- **formz:** Provides a unified way to handle form representation and validation purely in business logic, independent of the UI layer.
- **reactive_forms:** Model-driven form handling that is incredibly powerful for validating complex, dynamic, or multi-step data entry workflows.

#### UI & Design

- **flutter_screenutil:** For adapting UI elements and font sizes dynamically based on varying screen dimensions.
- **cached_network_image:** Crucial for caching remote images automatically to save bandwidth and improve load times.
- **shimmer:** For creating seamless loading placeholder animations.
- **gap:** A modern layout utility that replaces endless SizedBox(height: X) calls with cleaner, direction-aware spacing.
