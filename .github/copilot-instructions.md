# Copilot Instructions — Shop at Home

## Language & Framework Conventions

### JavaScript / TypeScript

- Use `const` and `let` — never `var`.
- Prefer arrow functions for callbacks and inline functions.
- Use template literals for string interpolation.
- Use `async`/`await` over raw Promises where possible.
- TypeScript (Angular and Svelte apps): use explicit types for function parameters and return values. Avoid `any`.

### Angular (angular-app)

- Follow Angular CLI conventions: one component per file, `*.component.ts` / `*.service.ts` / `*.module.ts` suffixes.
- Use NgRx for state management — actions, reducers, effects, selectors follow the NgRx pattern in `src/app/`.
- Use Angular's dependency injection for services.
- Router configuration lives in `src/app/router.ts`.
- Templates use Angular template syntax with structural directives (`*ngIf`, `*ngFor`).
- Lint with TSLint (`tslint.json` at `src/tslint.json`).

### React (react-app)

- Class components are **not** used — prefer functional components.
- State management uses Redux with Redux-Saga for side effects (see `src/store/`).
- Follow the Airbnb ESLint configuration (`.eslintrc.json` extends `react-app`).
- Format with Prettier (`.prettierrc`).
- Router uses `react-router-dom` v6.

### Svelte (svelte-app)

- Use TypeScript in Svelte components (`<script lang="ts">`).
- Styling uses SCSS imported globally from `src/styles.scss`.
- Build with Vite (`vite.config.ts`).
- Check types with `npm run check` (svelte-check).
- Store module in `src/store/` — uses Svelte writable stores.

### Vue (vue-app)

- Single-File Components (`.vue`) with `<template>`, `<script>`, `<style>` sections.
- State management via Vuex (`src/store/`).
- Routing via Vue Router (`src/router.js`).
- Follow Vue ESLint + Airbnb + Prettier rules (`.eslintrc.js`).
- Component filenames use kebab-case.

### API — Azure Functions (api/)

- Each function is a directory with `function.json` (bindings) and `index.js` (handler).
- Handlers receive `(context, req)` and set response via `context.res`.
- Shared data logic lives in `api/shared/`.
- Routes are defined declaratively in `function.json`, not in code.

### API — Fastify (fastify-api-server/)

- Plain JavaScript (CommonJS `require`).
- Routes are Fastify plugins registered in `src/routes/index.js`.
- Route prefix is `/api` (set in `src/server.js`).
- Security middleware: `@fastify/cors` and `@fastify/helmet`.

---

## Test Conventions

- **Angular**: Karma + Jasmine. Test files: `*.spec.ts` co-located with source. Run: `cd angular-app && npm test`.
- **React**: Jest via react-scripts. Test files: `*.test.js` co-located with source. Run: `cd react-app && npm test`.
- **Svelte / Vue / APIs**: No test setup currently exists.
- When adding new components or features, add corresponding tests in apps that have test infrastructure (Angular, React).
- Test names should describe the behavior, not the implementation.

---

## Code Style

- **Prettier** is configured in Angular, React, Svelte, and Vue apps (`.prettierrc` files). Format code before committing.
- **ESLint** is configured in React (Airbnb) and Vue (Airbnb + Vue plugin). Run `npm run lint` where available.
- **TSLint** is configured in Angular (`tslint.json`). Run `cd angular-app && npm run lint`.
- SCSS follows Bulma conventions — use Bulma utility classes where possible, custom SCSS for overrides only.

---

## Asset and Content Rules

- Static assets (images, icons, fonts) live in each app's `public/` or `src/assets/` directory.
- All apps use **Font Awesome** for icons — do not add other icon libraries.
- All apps use **Bulma** for CSS — do not introduce another CSS framework.
- Product images and globe assets are stored in `src/` alongside components that use them.

---

## Maintenance Matrix

| Change Made | Files to Update |
|---|---|
| **New product field added** | `api/shared/product-data.js`, `fastify-api-server/src/shared/product-data.js`, all four frontend product components/views, all four frontend store/state modules |
| **New API endpoint added** | `api/{endpoint}/function.json` + `api/{endpoint}/index.js`, `fastify-api-server/src/routes/{resource}.js`, `fastify-api-server/src/routes/index.js` (register route), corresponding frontend service/store calls in all four apps |
| **New shared data function** | `api/shared/product-data.js` AND `fastify-api-server/src/shared/product-data.js` (keep in sync) |
| **New UI component added** | Create in all four frontend apps (`angular-app/src/app/`, `react-app/src/components/`, `svelte-app/src/components/`, `vue-app/src/components/`) |
| **Styling changes** | `src/styles.scss` in the affected app(s). If changing shared look-and-feel, update all four apps. |
| **New frontend app added** | Root `README.md` table, `AGENTS.md` repository structure and tech stack, add Azure SWA workflow in `.github/workflows/` |
| **Node.js version updated** | `engines.node` in all 6 `package.json` files, `.devcontainer/devcontainer.json`, `.github/copilot-setup-steps.yml`, CI workflows |
| **New dependency added** | `package.json` in the specific app, re-run `npm install` to update `package-lock.json` |
| **Build or tooling changed** | Relevant `package.json` scripts, `.github/workflows/*.yml`, `.github/copilot-setup-steps.yml`, `AGENTS.md` build section |
| **Project structure changed** | `AGENTS.md` repository structure section, root `README.md`, `.github/copilot-instructions.md` maintenance matrix, CI workflow paths |
