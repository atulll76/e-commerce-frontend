## ADDED Requirements

### Requirement: Configurable API Remote Host
The system SHALL provide a settings input to dynamically modify the backend API remote host URL at runtime, updating the Axios client and persisting the value.

#### Scenario: Update Remote Host Base URL
- **WHEN** the user inputs a new host address and saves it
- **THEN** the system SHALL save the configuration to localStorage and apply it to subsequent API requests.

### Requirement: Paginated User Listing
The system SHALL request a list of users from the `/users` endpoint using pagination parameters and display user summaries in a tabular or grid list.

#### Scenario: Load User Profiles
- **WHEN** the Users Dashboard is loaded or page navigation changes
- **THEN** the system SHALL call GET `/users` with matching skip/limit parameters and display the user cards.

### Requirement: Create User Form
The system SHALL render a user registration form satisfying the backend model validation and submit it via a POST request to `/users`.

#### Scenario: Create User Profile
- **WHEN** the registration form is submitted with valid fields
- **THEN** the system SHALL perform a POST request to `/users` with the user payload and refresh the user listing.

### Requirement: Update User Form
The system SHALL allow viewing details of a selected user and submitting modified attributes via a PUT request to `/users/{user_id}`.

#### Scenario: Update User profile Details
- **WHEN** user changes details in the edit form and clicks save
- **THEN** the system SHALL dispatch a PUT request to `/users/{user_id}` and refresh the profile card.

### Requirement: Delete User Action
The system SHALL support deleting user profiles via a DELETE request to `/users/{user_id}` after a confirmation step.

#### Scenario: Delete User Profile
- **WHEN** the user selects delete and confirms the action
- **THEN** the system SHALL make a DELETE request to `/users/{user_id}` and refresh the list.
