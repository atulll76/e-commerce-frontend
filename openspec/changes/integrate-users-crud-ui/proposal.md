## Why

To implement a complete client-side administration interface for the e-commerce Users REST API, allowing administrators or developers to create, list, view, update, and delete user profiles with a dynamically configurable backend remote host.

## What Changes

- Create a self-contained feature module `src/features/users/` to house API requests, hooks, and UI components for managing users.
- Add support in `src/lib/apiClient.js` (or inline request logic) to dynamically switch backend API remote hosts at runtime.
- Build a host configuration setting widget in the UI that persists the base API URL in `localStorage`.
- Create a premium UI dashboard layout including user listings with pagination, a detailed user profile drawer/view, a user creation form, an edit form, and a delete validation flow.
- Update `src/App.jsx` to load and display the Users Dashboard.

## Capabilities

### New Capabilities
- `users-crud-ui`: The frontend capability to manage user profiles, send backend REST API requests, and dynamically switch the remote API host URL.

### Modified Capabilities

## Impact

- Rewrites `src/App.jsx` to mount the Users Dashboard.
- Modifies `src/lib/apiClient.js` to support dynamic baseURL configuration.
- Creates new files under `src/features/users/` for user management components and hooks.
