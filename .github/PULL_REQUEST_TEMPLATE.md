## Description

<!-- What does this PR do? One or two sentences. -->

## Which app(s) affected?

- [ ] Angular (`angular-app/`)
- [ ] React (`react-app/`)
- [ ] Svelte (`svelte-app/`)
- [ ] Vue (`vue-app/`)
- [ ] Azure Functions API (`api/`)
- [ ] Fastify API (`fastify-api-server/`)
- [ ] Shared / Root config

## Changes

<!-- List the key files changed and why -->
- 

## How to Test

<!-- Steps a reviewer can follow to verify -->
1. `cd {app-name} && npm install && npm start`
2. 

## Checklist

- [ ] Changes applied consistently across all affected apps
- [ ] API changes reflected in both `api/` and `fastify-api-server/` (if applicable)
- [ ] Shared data functions kept in sync (`api/shared/` ↔ `fastify-api-server/src/shared/`)
- [ ] README updated (if adding new features or apps)
- [ ] No `var` — using `const`/`let` only
- [ ] Prettier formatting applied
