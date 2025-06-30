# Shop at Home - AI Coding Instructions

This repository contains a multi-framework shopping app demonstrating Azure Static Web Apps and Azure Container Apps deployment patterns.

## Core Commands

### Prerequisites
- Node.js 20+ (required for all apps)
- [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local) (for API development)
- [SWA CLI](https://www.npmjs.com/package/@azure/static-web-apps-cli) (for full-stack local development)

### Setup
1. Navigate to desired app directory (e.g., `cd angular-app`)
2. Run `npm install` to install dependencies
3. Use framework-specific development commands below

### Frontend Applications

**Angular App** (`/angular-app/`)
- `npm run start` - Dev server with proxy (port 4200)
- `npm run build` - Production build
- `npm run test` - Run tests (requires karma dependencies to be installed)
- `npm run lint` - ESLint checking (requires @angular-eslint to be installed)
- `npm run start-angular-func-swa` - Run with Azure Functions via SWA CLI
- `npm run start-angular-fastify-swa` - Run with Fastify API via SWA CLI

**React App** (`/react-app/`)
- `npm run start` - Dev server (port 3000)
- `npm run build` - Production build with react-scripts
- `npm run test` - Run tests with Jest (no tests currently exist)
- `npm run lint` - ESLint checking (may have deprecation warnings)
- `npm run format` - Prettier formatting
- `npm run start-react-func-swa` - Run with Azure Functions via SWA CLI

**Vue App** (`/vue-app/`)
- `npm run serve` - Dev server (port 8080)
- `npm run build` - Production build with Vue CLI
- `npm run start-vue-func-swa` - Run with Azure Functions via SWA CLI
- `npm run start-vue-fastify-swa` - Run with Fastify API via SWA CLI

**Svelte App** (`/svelte-app/`)
- `npm run dev` - Dev server with Vite (port 5001)
- `npm run build` - Production build with Vite
- `npm run check` - TypeScript checking with svelte-check (may show type errors)
- `npm run validate` - Svelte validation
- `npm run start-svelte-func-swa` - Run with Azure Functions via SWA CLI

### Backend APIs

**Azure Functions** (`/api/`)
- `npm run start` - Start Functions runtime locally
- `func start` - Direct Functions Core Tools command
- Requires `local.settings.json` configuration file for local development

**Fastify API Server** (`/fastify-api-server/`)
- `npm run start` - Start Fastify server (port 3000)
- Direct Node.js execution with `node src/server.js`

### Development Workflows

**Full Stack Development:**
- Each app has SWA CLI integration for local full-stack development
- Use `*-func-swa` scripts for Azure Functions backend
- Use `*-fastify-swa` scripts for Fastify backend
- SWA CLI provides API proxying and static web app simulation

**Current Repository Status:**
- All frontend apps build successfully in production mode
- Some linting/testing setup may require additional dependencies
- TypeScript strict mode reveals type issues in Svelte app
- React app uses deprecated ReactDOM.render (consider upgrading to React 18)

## High-Level Architecture

### Frontend Technologies
- **Angular 18**: NgRx for state management, Angular CLI build system
- **React 17**: Redux + Redux Saga, Create React App build system  
- **Vue 3**: Vuex for state management, Vue CLI build system
- **Svelte 4**: Built-in reactivity, Vite build system

### Backend Services
- **Azure Functions**: Serverless API with Node.js runtime
  - Individual function endpoints: products-get, products-post, products-put, products-delete, discounts-get
  - Uses shared utilities and data layer
- **Fastify API Server**: Express alternative with better performance
  - Route-based organization in `/routes` directory
  - CORS and Helmet security middleware enabled

### External Dependencies
- **UI Framework**: Bulma CSS framework across all apps
- **Icons**: Font Awesome (various integration methods per framework)
- **HTTP Client**: Axios for API calls
- **Deployment**: Azure Static Web Apps, Azure Container Apps (App Spaces)

### Data Flow
- Frontend apps consume APIs via `/api/*` routes
- SWA CLI provides local API proxying during development
- Production deployments use Azure's built-in API integration

### Authentication
- Azure Static Web Apps built-in authentication
- Support for GitHub and Azure AD providers
- API routes are protected through Azure platform

## Repository-Specific Style Rules

### Code Formatting
- **Prettier** configured across all frontend apps
- **Print width**: 80 characters
- **Single quotes** preferred in Vue/React
- **Trailing commas** enabled

### Linting Rules
- **ESLint** with Airbnb config in React and Vue apps
- **Angular ESLint** for Angular app
- **TypeScript** strict mode in Angular and Svelte
- Console statements allowed (not errored) across apps

### Import/Module Conventions
- Use ES6 imports consistently
- Framework-specific import patterns:
  - Angular: Barrel exports from `@angular/*`
  - React: Component imports from relative paths
  - Vue: Single file component imports
  - Svelte: ES6 imports with `.js` extensions

### Naming Conventions
- **Components**: PascalCase across all frameworks
- **Files**: kebab-case for Vue, PascalCase for React/Angular components
- **CSS Classes**: Follow Bulma conventions with component-specific classes
- **API Routes**: RESTful patterns in `/api/*` endpoints

### Error Handling
- Use try/catch blocks for async operations
- Framework-specific error boundaries where applicable
- Consistent HTTP error response patterns in APIs

### Development Ports
- Angular: 4200
- React: 3000  
- Vue: 8080
- Svelte: 5001
- Fastify API: 3000

### Environment Configuration
- Use framework-specific environment variable patterns
- API URLs configured via build-time variables
- Local development uses SWA CLI for API proxying

### Testing Patterns
- Angular: Karma + Jasmine setup exists but requires additional dependencies
- React: Jest + React Testing Library setup exists but no tests written
- Vue/Svelte: No specific test setup (add as needed)
- Build validation: All frameworks support production builds successfully

### Build Optimization
- Production builds enabled for all frameworks
- Source maps disabled in production
- CSS extraction and minification enabled
- Tree shaking configured where supported