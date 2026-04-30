# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **AI-Ready configuration** — AGENTS.md, copilot-instructions.md, copilot-setup-steps.yml, issue templates, PR template, dependabot, and AI-Ready badge
- **Playwright E2E tests** — shared test suite across all 4 frontend apps (coming soon)

### Changed

- **Angular 18 → 21** — standalone components, new control flow (`@if`/`@for`), TypeScript 5.9, NgRx updated
- **React 17 → 19** — `createRoot` API, CRA replaced with Vite, functional components, Redux v5, React Router v7
- **Svelte 4 → 5** — runes (`$state`, `$derived`, `$props`), new event handlers (`onclick`), Vite 8, TypeScript 6
- **Vue 3.0 → 3.5** — Vuex replaced with Pinia, Vue Router 5, updated Composition API
- **Fastify 4 → 5** — updated plugin registration, `@fastify/cors` and `@fastify/helmet` updated
- **Azure Functions API** — migrated from v3 folder-based model to v4 programmatic model (`app.http()`)
- **Default branch** renamed from `master` to `main`
- **README** updated with current framework versions and fixed links
