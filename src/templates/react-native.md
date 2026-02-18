## React Native: Core Skills & Architecture

### 1. Best Coding Practices

- **Embrace the New Architecture:** Ensure your project leverages the New Architecture (Fabric and TurboModules). Bypassing the legacy JSON bridge in favor of synchronous C++ integration (JSI) provides vastly superior performance and native interoperability.
- **Component Splitting & Single Responsibility:** Strictly separate UI (Presentational) components from business logic (Container) components. Keep functional components concise and focused entirely on rendering data and dispatching events.
- **Strict TypeScript Adoption:** Avoid the `any` type completely. Always declare exact prop types using `type` for unions and `interface` for objects to catch UI bugs at compile-time and maintain a self-documenting codebase.
- **Offload the JS Thread:** Utilize React Native Worklets to push heavy computations, continuous background processing, and complex gesture handling off the main JavaScript thread, ensuring the UI remains highly responsive.
- **Optimize Asset Rendering:** Never render heavy local images without optimization. Resize assets locally, cache aggressively, and rely on performant image caching libraries to handle external assets from CDNs efficiently.

### 2. Directory Structure for Clean Code (Feature-Based)

As mobile applications scale, flat file structures quickly become unmaintainable. A **Feature-Based Folder Structure** groups files by their domain (e.g., Auth, Dashboard) rather than their technical type (e.g., Reducers, Components), ensuring highly modular, isolated, and testable code.

```text
/
├── src/
│   ├── app/                    # Entry points and global providers (Redux, Query)
│   ├── assets/                 # Local images, fonts, and Lottie JSON files
│   ├── features/               # Feature-driven modules
│   │   ├── auth/
│   │   │   ├── components/     # Feature-specific UI (e.g., LoginForm)
│   │   │   ├── screens/        # Screen compositions
│   │   │   ├── services/       # API calls and domain logic
│   │   │   └── store/          # Local slices/state (e.g., authSlice)
│   │   └── dashboard/          # Isolated feature module
│   ├── navigation/             # App navigators (Stack, Tab, Drawer configs)
│   ├── shared/                 # Reusable cross-feature assets
│   │   ├── components/         # Generic UI (Buttons, Inputs, Modals)
│   │   ├── hooks/              # Global custom hooks (useKeyboard, useTheme)
│   │   ├── theme/              # Colors, typography, spacing constants
│   │   └── utils/              # Helper functions, loggers, formatters
│   └── store/                  # Global state configuration
└── App.tsx                     # Root component
```

### 3. Best Design Practices

- **Build a Cohesive Design System:** Avoid inline styles or hardcoded hex codes (#FFFFFF). Create a unified `theme/` directory exporting constants for spacing, typography, and colors to ensure absolute visual consistency across all screens.
- **Adaptive Spacing & Sizing:** Mobile screens vary wildly. Use Flexbox extensively and rely on safe-area insets rather than hardcoding static pixel heights, ensuring your app looks natural on everything from a compact phone to a large tablet.
- **Prioritize Accessibility (a11y):** Build inclusively from day one. Implement proper `accessibilityLabel`, `accessibilityRole`, and ensure contrast ratios meet standard guidelines to support screen readers and dynamic system text scaling.
- **Centralize Theming:** Implement runtime theming robustly. Use context or a dedicated styling engine to ensure instantaneous, flicker-free toggling between dark and light modes.

### 4. Essential Packages & Libraries

#### Architecture & State Management

- **Zustand:** The modern, lightweight favorite for global client state (themes, user sessions, UI toggles). It is significantly less verbose than Redux and highly performant.
- **Redux Toolkit (RTK):** The battle-tested standard for massive enterprise applications that require strict architectural guardrails, predictable state transitions, and robust middleware.
- **TanStack Query (React Query):** The ultimate solution for server state management. It handles caching, background fetching, automatic retries, and optimistic UI updates seamlessly, drastically reducing API boilerplate.

#### UI & Design Components

- **Tamagui:** A top-tier choice for performance-critical apps. It offers an optimizing compiler that extracts styles to native equivalents, delivering exceptional speed and seamless React Native Web compatibility.
- **gluestack UI:** Evolved from NativeBase, this library provides highly accessible, customizable, and universal components out of the box.
- **Shopify Restyle:** The enterprise choice for enforcing a strict, type-safe design system across large development teams.

#### Validation & Forms

- **Zod:** The undisputed champion of TypeScript-first schema validation. Use it to validate API payloads and user input with flawless type inference.
- **React Hook Form:** The most performant way to build complex, multi-step forms. It minimizes re-renders by using uncontrolled components and integrates perfectly with Zod via standard resolvers.

#### Animation & Utilities

- **React Native Reanimated:** The absolute necessity for 60-120fps animations. It executes logic directly on the UI thread, bypassing the JS bridge entirely for silky smooth transitions.
- **Lottie React Native:** The industry standard for integrating complex, scalable vector animations exported directly from Adobe After Effects.
