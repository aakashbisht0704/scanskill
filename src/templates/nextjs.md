## Next.js: Core Skills & Architecture

### 1. Best Coding Practices

- **Server Components by Default:** Adopt a "Server-First" mental model. Keep logic on the server to reduce bundle size and access the database directly. Only add `"use client"` when interactivity (hooks, event listeners) is strictly necessary.
- **leverage `next/image` & `next/font`:** Never use standard `<img>` tags or external stylesheets for fonts. Use the built-in components to automatically handle resizing, lazy loading, format optimization (WebP/AVIF), and zero layout shift.
- **Colocation:** Keep related code together. Instead of separating files by type (e.g., all controllers in one folder), place your components, tests, and styles inside the specific route segment or feature folder they belong to.
- **Metadata API:** Discard standard HTML `<head>` tags. Use the exported `metadata` object or `generateMetadata` function in your `page.tsx` and `layout.tsx` files to manage SEO tags dynamically and efficiently.
- **Granular Caching:** Master the `fetch` API extensions. Use `revalidatePath` and `revalidateTag` to update data precisely when needed, rather than disabling caching globally or relying solely on time-based revalidation.

### 2. Directory Structure for Clean Code (App Router)

For scalable applications, use a **Feature-Driven** structure within the `app` directory. Group routes logically and separate global UI from feature-specific UI.

```text
/
├── app/
│   ├── (auth)/                 # Route Group (doesn't affect URL path)
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── form.tsx        # Colocated component
│   │   └── register/
│   ├── dashboard/
│   │   ├── layout.tsx          # Nested layout for dashboard
│   │   ├── loading.tsx         # Suspense fallback for this route
│   │   └── page.tsx
│   ├── api/                    # Route Handlers (Backend API)
│   ├── globals.css
│   └── layout.tsx              # Root layout
├── components/
│   ├── ui/                     # Reusable primitive components (Buttons, Inputs)
│   └── main-nav.tsx            # Global shared components
├── lib/
│   ├── db.ts                   # Database connection singleton
│   └── utils.ts                # cn() helper, formatters
├── hooks/                      # Global custom hooks
└── public/                     # Static assets
```

### 3. Best Design Practices

- **Streaming & Suspense:** Don't make the user wait for the entire page to render. Wrap slow data-fetching components in `<Suspense>` and use `loading.tsx` files to show instant skeletons while the heavy content loads.
- **Layout Composition:** Use `layout.tsx` effectively to persist UI elements (like sidebars or music players) across navigation without re-rendering them, preserving state and scroll position.
- **Error Boundaries:** Always include an `error.tsx` file in your route segments. This acts as a React Error Boundary, allowing you to gracefully handle runtime errors and offer a "Try Again" button without crashing the entire app.
- **Component Composition:** Build small. A large "Dashboard" component is hard to maintain. Compose it from smaller server components (e.g., `<RevenueChart />`, `<RecentSales />`) so they can fetch their own data in parallel.

### 4. Essential Packages & Libraries

#### Styling & UI

- **Tailwind CSS:** The industry standard for utility-first styling. It pairs perfectly with Next.js for zero-runtime overhead.
- **shadcn/ui:** Not a component library, but a collection of copy-pasteable accessible components built on Radix UI and Tailwind. Highly recommended for complete control.
- **clsx & tailwind-merge:** Essential utilities for conditionally applying classes and resolving Tailwind conflicts without headaches.
- **Lucide React:** A beautiful, consistent icon set that is lightweight and heavily used in the Next.js ecosystem.

#### Validation & Forms

- **Zod:** TypeScript-first schema declaration and validation library. Use it to validate environment variables, API responses, and form data strictly.
- **React Hook Form:** The most performant form library for React. It minimizes re-renders and integrates seamlessly with Zod via `hookform/resolvers`.

#### State & Data Fetching

- **TanStack Query (React Query):** While Server Components handle initial fetching, use this for client-side data synchronization, polling, and optimistic UI updates.
- **Zustand:** A small, fast, and scalable state management solution. much simpler than Redux and perfect for handling global client state (like sidebar toggle, theme, or cart).

#### Authentication & Utilities

- **Auth.js (formerly NextAuth):** The go-to solution for authentication. It supports OAuth, email magic links, and handles session security automatically.
- **date-fns:** A comprehensive and lightweight toolset for manipulating JavaScript dates.
