## React: Core Skills & Architecture

### 1. Best Coding Practices

- **Standardize on Functional Components & Hooks:** Write exclusively functional components. Extract complex business logic, API calls, and event listeners into isolated custom hooks (e.g., `useTenantConfig`, `useAuth`) to keep your presentation layer strictly focused on rendering UI.
- **Strict Dependency Arrays:** Exhaustively declare every reactive variable inside the dependency arrays of `useEffect`, `useCallback`, and `useMemo`. This prevents insidious bugs caused by stale closures, especially in environments with complex asynchronous state.
- **Strategic Memoization:** Apply `React.memo`, `useMemo`, and `useCallback` only when necessary—specifically when passing props to heavy child components or preventing expensive recalculations on large datasets. Over-memoizing adds unnecessary memory overhead.
- **Type Safety First:** Utilize TypeScript interfaces and types to strictly define component props and API payloads. This ensures compile-time safety and prevents runtime crashes, which is critical when handling complex relational data.
- **Isolate Side Effects:** Keep `useEffect` usage to an absolute minimum. Rely on event handlers for user-triggered actions and dedicated data-fetching libraries for API synchronization, using `useEffect` solely for synchronizing with external systems (like WebSockets or third-party DOM libraries).

### 2. Directory Structure for Clean Code (Feature-Driven)

For highly scalable, cloud-native SaaS platforms, a domain-driven or **Feature-First** architecture is essential. It isolates specific business domains, making the codebase easier to navigate, test, and scale across multiple teams.

```text
src/
├── core/                       # App-wide singleton configurations
│   ├── api/                    # Axios/Fetch instances, global interceptors
│   ├── auth/                   # Multi-tenant authentication context
│   └── routes/                 # App routing configuration
├── features/                   # Isolated, domain-driven modules
│   ├── tenant_management/      # Feature: Multi-tenant configuration
│   ├── student_records/        # Feature: Core data handling
│   └── health_analytics/       # Feature: Dashboards and reporting
│       ├── api/                # Feature-specific API calls
│       ├── components/         # Feature-specific UI
│       └── hooks/              # Feature-specific logic
├── shared/                     # Cross-feature reusable resources
│   ├── components/             # Generic UI (Buttons, Modals, Tables)
│   ├── hooks/                  # Global hooks (useDebounce, useClickOutside)
│   └── utils/                  # Formatters, validators, constants
├── App.tsx                     # Root component and global providers
└── main.tsx                    # DOM entry point
```

### 3. Best Design Practices

- **Component-Driven Development:** Build UIs from the bottom up. Start with atomic elements (buttons, inputs) and compose them into complex features. Use tools like Storybook to document and test these UI components in isolation.
- **Granular Code Splitting:** Use `React.lazy` and `<Suspense>` to split your bundle by routes or heavy features. This ensures users only download the JavaScript necessary for the page they are currently viewing, drastically improving initial load times.
- **Robust Error Boundaries:** Wrap major feature sections in Error Boundaries. If a specific widget or module crashes (e.g., a data chart fails to parse), the Error Boundary catches it and displays a localized fallback UI without taking down the entire application.
- **Uncompromised Accessibility (a11y)::** When building platforms that handle essential services or sensitive data, ensure strict adherence to ARIA standards, keyboard navigability, and semantic HTML elements to serve all users effectively.

### 4. Essential Packages & Libraries

#### State Management & Data Fetching

- **TanStack Query (React Query):** The industry standard for managing server state. It automates caching, background synchronization, pagination, and optimistic updates, eliminating the need to store API responses in global client state.
- **Zustand:** A minimalist, highly performant client state manager. It completely replaces the heavy boilerplate of Redux for managing global UI state like sidebar toggles, theme preferences, or active tenant contexts.
- **React Router (v6+):** The definitive routing solution, leveraging modern features like nested routes, loaders, and actions to handle complex navigation flows seamlessly.

#### Styling & UI

- **Tailwind CSS:** The premier utility-first CSS framework for building custom, responsive designs rapidly without bloated stylesheets.
- **shadcn/ui & Radix UI:** Unstyled, accessible component primitives. Radix handles the complex accessibility and keyboard logic, while shadcn provides beautiful, copy-pasteable Tailwind configurations.
- **Framer Motion:** The go-to library for production-ready, declarative animations and gesture handling.

#### Validation & Forms

- **React Hook Form:** The most performant way to manage complex form states. It minimizes re-renders and handles dynamic fields effortlessly.
- **Zod:** A schema declaration and validation library. When paired with React Hook Form, it provides impenetrable validation for critical data entry workflows.

#### Testing

- **Vitest:** A blazing fast, Vite-native testing framework that serves as a modern, seamless drop-in replacement for Jest.
- **React Testing Library:** The standard for testing components by simulating actual user interactions rather than testing implementation details.
