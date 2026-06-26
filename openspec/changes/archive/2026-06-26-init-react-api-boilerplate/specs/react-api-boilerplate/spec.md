## ADDED Requirements

### Requirement: Directory Structure Setup
The system SHALL establish a standardized, feature-based React directory layout under the `src/` directory to modularize features, library clients, routes, and components.

#### Scenario: Verify Directory Layout
- **WHEN** the boilerplate project is initialized
- **THEN** folders for assets, components, config, context, features, hooks, layouts, lib, routes, store, and utils SHALL exist under the `src/` directory.

### Requirement: Axios API Client Configuration
The system SHALL configure a global Axios client instance in `src/lib/apiClient.js` pointing to a base URL loaded from environment variables, including interceptors for auto-attaching Bearer token authorization headers and handling HTTP error statuses.

#### Scenario: Request Interceptor Attaches Authorization Header
- **WHEN** an HTTP request is made through the API client and a token exists in localStorage
- **THEN** the request headers SHALL include the Bearer authentication token.

#### Scenario: Response Interceptor Catches HTTP Unauthorized Error
- **WHEN** the backend returns a 401 Unauthorized status
- **THEN** the API client response interceptor SHALL intercept the error to initiate logout or token refresh.

### Requirement: Sample Feature Integration
The system SHALL provide a sample feature named `products` inside `src/features/products` implementing a REST API query function, a custom React hook for data state management, and a presentation UI component displaying fetched data.

#### Scenario: Product list component displays data
- **WHEN** the ProductList component mounts and queries the API
- **THEN** it SHALL retrieve product data and render the items.
