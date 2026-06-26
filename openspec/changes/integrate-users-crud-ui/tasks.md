## 1. Network Layer Adaptations

- [x] 1.1 Update `src/lib/apiClient.js` to load the API host URL from `localStorage` on init, and export a helper function `updateApiHost` to update the base URL dynamically.

## 2. API and Hooks Implementation

- [x] 2.1 Create the API request helper functions in `src/features/users/api/usersApi.js`.
- [x] 2.2 Implement the custom React hook `src/features/users/hooks/useUsers.js` to manage loading, pagination, and offline/mock data fallback states.

## 3. UI Components Implementation

- [x] 3.1 Implement the Host Configuration component `src/features/users/components/HostConfig.jsx` for editing and persisting the API base URL.
- [x] 3.2 Build the User Edit/Create Form component `src/features/users/components/UserForm.jsx` with input field validations.
- [x] 3.3 Create the core Users Dashboard component `src/features/users/components/UserDashboard.jsx` to tie together user listings, forms, and settings.
- [x] 3.4 Expose the features entry point `src/features/users/index.js` and mount the `UserDashboard` component in `src/App.jsx`.

## 4. Verification and Validation

- [x] 4.1 Execute project production builds using `npm run build` to verify there are no syntax or type compilation errors.
- [x] 4.2 Verify dynamic API switching and mock fallback features in the dashboard component under mock/live tests.
