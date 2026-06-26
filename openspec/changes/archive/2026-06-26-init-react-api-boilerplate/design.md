## Context

Currently, there is no standardized React project layout or REST API client configured in the workspace repository. Developing web applications calling backend services requires a robust, scalable template to avoid fragmented folder structures and inconsistent data-fetching approaches.

## Goals / Non-Goals

**Goals:**
- Establish a clean, feature-based modular directory layout under the `src/` directory.
- Configure a global, reusable Axios API client at `src/lib/apiClient.js` supporting request/response interceptors.
- Implement a sample `products` feature inside `src/features/products` demonstrating the integration flow: API call -> Custom hook -> React UI component.
- Configure local environment variable management to point dynamically to different backend base URLs.

**Non-Goals:**
- Setting up specific UI design systems or component libraries.
- Creating a real production mock backend service.
- Implementing complex client-side caching systems like TanStack Query (custom fetch hooks using React primitives will be used, keeping the dependency list minimal).

## Decisions

### 1. HTTP Client: Axios over Fetch
- **Rationale**: Axios provides built-in request/response interceptors, automatic JSON serialization/deserialization, request cancellation, and robust timeout configurations out-of-the box. This eliminates boilerplate wrappers required when using the native `fetch` API.
- **Alternatives Considered**: Native Fetch API (requires custom wrappers for interceptor behavior and JSON error parsing).

### 2. Layout Pattern: Feature-based Folder Structure
- **Rationale**: Groups files by domain feature (e.g., `features/products`) rather than file type (e.g., all components in `/components`, all api files in `/api`). This co-locates UI code, state management (hooks), and network layers (api), making features self-contained and significantly easier to refactor or scale.
- **Alternatives Considered**: Technical Role-based (simpler for very small projects but becomes cluttered and hard to navigate as the code size increases).

### 3. API State Management: Custom React hooks using standard primitives
- **Rationale**: Simplifies the baseline template by keeping the library dependencies light (avoiding adding TanStack Query or Redux Toolkit initially), while keeping hook signatures aligned with industry standard patterns so that developers can easily introduce caching libraries later.
- **Alternatives Considered**: TanStack Query (deferred until developers require it to keep the initial setup lean).

## Risks / Trade-offs

- **[Risk]** Custom data fetching hooks do not cache API responses, leading to redundant network calls.
  - *Mitigation*: Ensure hook design uses structured query patterns that can be easily replaced by TanStack Query or SWR hooks in the future.
- **[Risk]** Missing env variables at runtime/build-time can break backend routing.
  - *Mitigation*: Include a clear `.env.example` file and configure checking inside `src/lib/apiClient.js` to throw or fallback to a default URL if none is configured.
