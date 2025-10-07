# 📘 Documentation

## 📖 1. Overview

This project implements a product detail page inspired by Mercado Libre, along with a supporting REST backend API.
The goal was to prioritize UX, performance, and maintainability under time constraints, achieving ≥80% test coverage and a frictionless developer experience via Docker or local setup.

<u>Main Stack:</u>

- <u>Frontend</u>: Next.js (App Router), React, TypeScript, TailwindCSS, React Query.
- <u>Frontend Testing</u>: Jest + React Testing Library (unit), Playwright (E2E).
- <u>Backend</u>: Node.js + Express, persisted with local JSON files (no database).
- <u>Infrastructure</u>: Docker Compose for orchestrating both api and web services.

## 🧱 2. Design Choices

### 2.1 Project Architecture

The project is structured as a monorepo containing two main applications:

| Folder | Description                                                                                  |
| ------ | -------------------------------------------------------------------------------------------- |
| /api   | Backend built with Node.js + Express, TypeScript, and local JSON persistence.                |
| /web   | Frontend built with Next.js 15 (App Router), replicating MercadoLibre’s product detail page. |

Both modules are independent but share:

- Unified configuration for TypeScript, ESLint, and test scripts.
- Combined execution via Docker Compose.
- Individual coverage reports (/coverage/) for clarity and quality tracking.

### 2.2 Frontend (Web)

- <u>Framework</u>: Next.js (App Router) with SSR support for SEO and performance.
- <u>Styling</u>: TailwindCSS with semantic tokens (text-secondary, bg-border, etc.) for visual consistency.
- <u>Data & State Management</u>: React Query handles async states, caching, and error boundaries.
- <u>Component Architecture</u>: Organized by domain (details, gallery, purchase, seller, recommendations, errors, skeleton) for maintainability and scalability.
- <u>Responsive Design</u>: Separate layouts for desktop and mobile (ProductDesktopLayout / ProductMobileLayout), driven by the useDevice hook.
- <u>Error & Loading States</u>: Dedicated components under /product/errors and a visual skeleton loader during fetches.

### 2.3 Backend (API)

- <u>Stack</u>: Node.js + Express with TypeScript.
- <u>Persistence</u>: Data stored locally in /data/products.json, fulfilling the “no database” constraint of the challenge.
- <u>Middlewares</u>: Centralized error handling and field validation for consistent API responses.
- <u>Documentation</u>: Interactive Swagger UI available at /docs.

| Method  | Endpoint               | Description                                           |
| :------ | :--------------------- | :---------------------------------------------------- |
| **GET** | `/ping`                | Returns service health status.                        |
| **GET** | `/items`               | Retrieves all available products.                     |
| **GET** | `/items/{id}`          | Retrieves a single product by ID.                     |
| **GET** | `/items/{id}/related`  | Returns related products for a given item.            |
| **GET** | `/items/brand/{brand}` | Returns all products for a specific brand.            |
| **GET** | `/items/{id}/page`     | Returns combined product data for a full page render. |

### 2.4 Testing & Quality

| Layer                     | Tools                                                      | Description                                              |
| ------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| **Frontend (unit tests)** | Jest + React Testing Library                               | 50+ tests covering hooks and components (>80% coverage). |
| **Frontend (E2E)**        | Playwright                                                 | End-to-end testing of the complete product flow.         |
| **Backend**               | Jest + Supertest                                           | Tests for controllers, routes, and middlewares.          |
| **Coverage Reports**      | lcov + HTML                                                | Accessible reports via `/coverage`.                      |
| **CI Ready**              | Unified test scripts (`test`, `test:coverage`, `test:e2e`) | Easy integration in any pipeline.                        |

## 🚧 3. Challenges & Solutions

### 3.1 Multi-environment Configuration

<b>Challenge:</b> Running both the API and the frontend simultaneously in dev and test environments.

Solution:

- Added a Docker Compose setup to boot both services together.
- Integrated the API into Playwright’s webServer config to ensure backend availability during E2E tests.
- Unified environment variables and ports (3000 for web, 4000 for API).

### 3.2 Testing Complex Hooks (useDevice, useSwipeCarousel)

<b>Challenge:</b> Hooks depending on the window object and browser events produced inconsistent Jest results.

Solution:

- Added SSR-safe guards (typeof window === 'undefined') to simulate server environments.
- Mocked window events (resize, touchstart, touchend) for deterministic behavior.
- Achieved >95% coverage on hooks, including cleanup logic (removeEventListener, clearTimeout).

### 3.3 Type Synchronization Between Backend and Frontend

<b>Challenge:</b> Prevent data structure mismatches between the backend’s JSON and frontend’s TypeScript models.

Solution:

- Defined shared interfaces in /web/src/types mirroring backend JSON shape.
- Reused Product and Seller types across modules to maintain full consistency.

### 3.4 Error and Empty State Handling

<b>Challenge:</b> Provide clear and testable feedback for loading, error, and not-found states.

Solution:

- Created dedicated components (ErrorProduct, NotFoundProduct) under /product/errors.
- Added a product skeleton component for loading states.
- Each state is accessible via data-testid attributes for reliable testing.

### 3.5 Coverage and Warnings

<b>Challenge:</b> Maintain high coverage while keeping test output clean from irrelevant warnings (e.g., punycode, next/image).

Solution:

- Mocked problematic modules in jest.setup.ts.
- Added NODE_NO_WARNINGS=1 in test scripts to suppress noisy warnings.
- Separate coverage outputs for api and web to ensure clarity in results.

## 🏁 4. Final Notes

This monorepo fully meets the challenge requirements:

- A fully functional and responsive product detail page.
- A documented and tested API with local data persistence.
- Code coverage above 80% in both backend and frontend.
- Simple execution via Docker Compose or manual commands (npm run dev).

### Highlights

- Consistent development flow between backend and frontend.
- Modular architecture with clear domain separation.
- UX-first approach with graceful visual states (loading, error, not found).
- Reliable tests ensuring stability and maintainability.

### Possible Next Steps

- Add i18n (English/Spanish/Portuguese).
- Implement pagination and filters in the API.
- Enable Incremental Static Regeneration (ISR) for popular products.
- Set up CI/CD pipelines to run tests and coverage automatically on push.
