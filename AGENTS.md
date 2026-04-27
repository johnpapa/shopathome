# Shop at Home — Contributor & Agent Guide

## Project Overview

Shop at Home is a full-stack shopping list application that lets customers securely add, edit, view, and remove grocery and household items. The project is designed as a learning resource for Azure Static Web Apps and Azure Container Apps, providing **four frontend implementations** (Angular, React, Svelte, Vue) backed by **two API options** (Azure Functions and Fastify).

Live demos: [angular.shopathome.dev](https://angular.shopathome.dev) · [react.shopathome.dev](https://react.shopathome.dev) · [svelte.shopathome.dev](https://svelte.shopathome.dev) · [vue.shopathome.dev](https://vue.shopathome.dev)

---

## Repository Structure

```
shopathome/
├── angular-app/          # Angular 18 frontend (NgRx state management)
│   ├── src/app/          # Components, services, routing, store
│   └── package.json
├── react-app/            # React 17 frontend (Redux + Redux-Saga)
│   ├── src/              # Components, store, product views
│   └── package.json
├── svelte-app/           # Svelte 4 frontend (Vite build, TypeScript)
│   ├── src/              # Components, store, models
│   └── package.json
├── vue-app/              # Vue 3 frontend (Vuex state management)
│   ├── src/              # Components, views, store, router
│   └── package.json
├── api/                  # Azure Functions API (serverless)
│   ├── products-get/     # GET /api/products
│   ├── products-post/    # POST /api/products
│   ├── products-put/     # PUT /api/products
│   ├── products-delete/  # DELETE /api/products
│   ├── discounts-get/    # GET /api/discounts
│   └── shared/           # Shared data layer (in-memory)
├── fastify-api-server/   # Fastify 4 API (containerized)
│   └── src/
│       ├── server.js     # Server entry point (port 3000)
│       ├── routes/       # Route handlers (products, discounts)
│       └── shared/       # Shared data layer (in-memory)
├── .devcontainer/        # Dev container config (Svelte + API)
├── .github/workflows/    # Azure Static Web Apps deploy workflows
├── CONTRIBUTING.md       # Contribution guidelines
└── README.md             # Project overview and deployment guide
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Angular frontend** | Angular, NgRx, TypeScript, Karma/Jasmine | Angular 18, TS ~5.4 |
| **React frontend** | React, Redux, Redux-Saga, JavaScript | React 17 |
| **Svelte frontend** | Svelte, TypeScript, Vite | Svelte 4, Vite 4 |
| **Vue frontend** | Vue 3, Vuex, Vue Router, JavaScript | Vue 3 |
| **Azure Functions API** | Azure Functions (Node.js) | v4 runtime |
| **Fastify API** | Fastify, CORS, Helmet | Fastify 4 |
| **CSS** | Bulma, SCSS, Font Awesome | Bulma 0.9 |
| **Runtime** | Node.js | ≥ 20 |
| **Package manager** | npm | (lockfiles present per app) |
| **Deployment** | Azure Static Web Apps, Azure Container Apps | — |
| **Dev tools** | Prettier, ESLint, TSLint (Angular), SWA CLI | — |

---

## Build & Run

Each frontend app and each API is an independent npm project. Install and run them separately.

### Prerequisites

- Node.js ≥ 20
- [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local) (for the Azure Functions API)
- [SWA CLI](https://www.npmjs.com/package/@azure/static-web-apps-cli) (for local integration)

### Install dependencies (per app)

```bash
cd angular-app && npm install
cd react-app && npm install
cd svelte-app && npm install
cd vue-app && npm install
cd api && npm install
cd fastify-api-server && npm install
```

### Run a frontend with the Azure Functions API

```bash
# Example: Svelte + Azure Functions
cd svelte-app
npm run start-svelte-func-swa
```

### Run a frontend with the Fastify API

```bash
# Example: Svelte + Fastify
cd svelte-app
npm run start-svelte-fastify
```

### Build a frontend

```bash
cd angular-app && npm run build     # ng build --configuration production
cd react-app && npm run build       # react-scripts build
cd svelte-app && npm run build      # vite build
cd vue-app && npm run build         # vue-cli-service build
```

### Run the Fastify API standalone

```bash
cd fastify-api-server && npm start  # Starts on http://localhost:3000
```

### Run the Azure Functions API standalone

```bash
cd api && npm start                 # func start (port 7071)
```

---

## Testing

| App | Test Runner | Command |
|-----|-------------|---------|
| angular-app | Karma + Jasmine | `cd angular-app && npm test` |
| react-app | Jest (via react-scripts) | `cd react-app && npm test` |
| svelte-app | No test setup | — |
| vue-app | No test setup | — |
| api | No test setup | — |
| fastify-api-server | No test setup | — |

When adding new features, add tests to the Angular and React apps at minimum. Follow existing patterns:

- **Angular**: Test files use `*.spec.ts` alongside components in `src/app/`.
- **React**: Test files use `*.test.js` alongside components in `src/`.

---

## Key Patterns and Conventions

### Frontend architecture (all four apps)

All four frontends implement the same UI and feature set. They share:

- **Bulma CSS framework** with SCSS for styling
- **Font Awesome** icons
- **State management**: Angular uses NgRx, React uses Redux + Saga, Vue uses Vuex, Svelte uses a custom store
- **Component structure**: Each app has reusable UI components (HeaderBar, NavBar, Modal, CardContent, ButtonFooter, etc.) and feature-specific views (Products, Discounts, Home)
- **API proxy**: Configured to call `/api/*` which proxies to either Azure Functions or Fastify

### API architecture

Both API implementations expose the same CRUD endpoints under `/api/`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List all products |
| `/api/products` | POST | Add a product |
| `/api/products` | PUT | Update a product |
| `/api/products` | DELETE | Delete a product |
| `/api/discounts` | GET | List all discounts |

Data is stored **in-memory** (no database). The shared data layer (`shared/product-data.js` and `shared/discount-data.js`) is identical between both APIs.

### Azure Functions structure

Each function is a directory with `function.json` (bindings) and `index.js` (handler). Routes are defined in the function bindings.

### Fastify structure

Routes are registered via `fastify.register()` in `src/routes/index.js`, prefixed with `/api`. Individual route files (`products.js`, `discounts.js`) export route handler functions.

### Naming conventions

- **Angular**: PascalCase components, kebab-case filenames, `.component.ts` / `.service.ts` suffixes
- **React**: PascalCase components, PascalCase filenames (`.js`)
- **Svelte**: PascalCase components (`.svelte` files)
- **Vue**: kebab-case component filenames (`.vue`), PascalCase in templates
- **API**: lowercase kebab-case directory and filenames

---

## CI/CD

Six Azure Static Web Apps workflows exist in `.github/workflows/`, each deploying a specific frontend on push to `main` and on pull requests. These workflows:

- Trigger on `push` to `main` and `pull_request` events
- Are scoped to specific frontend paths (e.g., `react-app/**`)
- Use `Azure/static-web-apps-deploy@v1` action
- Deploy to separate Azure Static Web Apps instances

---

## Adding a New Frontend Implementation

1. Create a new directory at the repo root: `{framework}-app/`
2. Initialize with `npm init` and add framework dependencies
3. Set `engines.node` to `>=20.0.0` in `package.json`
4. Add Bulma (`bulma`) and Font Awesome as dependencies for UI consistency
5. Add SCSS support and create `src/styles.scss` importing Bulma
6. Implement the same components: HeaderBar, NavBar, CardContent, ButtonFooter, Modal, etc.
7. Implement product CRUD views (list, add, edit, delete) and a discounts view
8. Configure API proxy to forward `/api/*` requests
9. Add convenience scripts in `package.json`:
   - `start-{framework}-func-swa` — run with Azure Functions via SWA CLI
   - `start-{framework}-fastify` — run with Fastify API
   - `start-{framework}-fastify-swa` — run with Fastify via SWA CLI
10. Update the root `README.md` table with the new app
11. Update this `AGENTS.md` file

---

## Adding a New API Endpoint

### Azure Functions API

1. Create a new directory in `api/` named `{resource}-{method}` (e.g., `categories-get`)
2. Add `function.json` with HTTP trigger bindings (set `authLevel`, `methods`, `route`)
3. Add `index.js` handler importing from `../shared/`
4. If needed, add data functions to `api/shared/` data files

### Fastify API

1. Create a new route file in `fastify-api-server/src/routes/` (e.g., `categories.js`)
2. Export an async route handler function using `fastify.get()`, `fastify.post()`, etc.
3. Register the route in `src/routes/index.js` via `fastify.register()`
4. If needed, add data functions to `fastify-api-server/src/shared/`

**Keep both APIs in sync** — any new endpoint must be added to both implementations.

---

## Common Pitfalls

- **Each frontend is independent** — there is no root `package.json` or workspace config. You must `cd` into each app and run `npm install` separately.
- **Both APIs use in-memory data** — data resets on every restart. Do not assume persistence.
- **SWA CLI must be installed globally** — `npm install -g @azure/static-web-apps-cli`
- **Azure Functions Core Tools required** — for the `api/` project, install `azure-functions-core-tools@4`
- **Frontends use different ports**: Angular (4200), React (3000), Svelte (5001), Vue (8080), Fastify (3000). Watch for port conflicts when running React and Fastify simultaneously.
- **TypeScript is used only in Angular and Svelte** — React and Vue apps are plain JavaScript.
- **Angular uses the older TSLint** — not ESLint. When modifying the Angular app, respect `tslint.json`.
