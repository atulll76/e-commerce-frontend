## Context

The backend REST API provides a `/users` resource for user profiles with standard CRUD methods. We need to create a premium admin dashboard in React to manage these users, while keeping the API server host dynamically configurable at runtime to support switching between local, staging, and production environments.

## Goals / Non-Goals

**Goals:**
- Implement a configurable API host widget in the UI that updates the base API URL dynamically.
- Build a CRUD admin panel for users: view all (paginated), view detail, create user, edit user, and delete user.
- Gracefully handle connection failures by displaying a clear notification and falling back to preview mock data.

**Non-Goals:**
- Implementing advanced user session/JWT login screens (this change targets profile CRUD operations only).
- Creating automated server-side testing mocks.

## Decisions

### 1. Dynamic Axios Base URL Configuration
- **Rationale**: Instead of hardcoding `baseURL` in a build-time variable (`.env`), the app will read the host from `localStorage` on start. A helper function `updateApiHost(url)` will update `apiClient.defaults.baseURL` dynamically and persist the choice in `localStorage`.
- **Alternatives Considered**: Creating multiple Axios clients (too heavy/redundant).

### 2. Feature-based Users Module Structure
We will group all user UI, API, and custom hooks under `src/features/users/` to keep the code modular:
- `api/usersApi.js`: Defines REST requests (`getUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser`).
- `hooks/useUsers.js`: Manages list fetching, pagination variables, loading/error states, and action dispatching.
- `components/UserDashboard.jsx`: Main interface coordinating pagination, deletion confirmations, configuration, and form dialog triggers.
- `components/UserForm.jsx`: Reusable form component handling validation for creation/editing.
- `components/HostConfig.jsx`: Remote backend URL manager widget.

### 3. Graceful Offline Mock Fallback
- **Rationale**: Since the backend service might not be running locally on the user's host machine right now, the UI will detect connection errors (e.g. `ERR_CONNECTION_REFUSED`), show a status bar message, and automatically populate local mock profiles so the user can test the UI functionality (create, edit, delete, pagination) directly.

## Risks / Trade-offs

- **[Risk]** Dynamic base URL configuration might result in CORS issues when switching hosts.
  - *Mitigation*: Output a guide in the host configuration panel explaining how to configure API CORS headers on the backend.
- **[Risk]** Local storage changes won't automatically sync across open browser tabs.
  - *Mitigation*: For this context, standard component state updates coupled with manual page refreshes are sufficient.
