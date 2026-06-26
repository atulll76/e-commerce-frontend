## 1. Directory Structure Setup

- [x] 1.1 Create baseline React folder structure: `src/assets`, `src/components`, `src/config`, `src/context`, `src/features`, `src/hooks`, `src/layouts`, `src/lib`, `src/routes`, `src/store`, `src/utils`
- [x] 1.2 Configure `package.json` to add `axios` as a dependency

## 2. API Client Configuration

- [x] 2.1 Implement the Axios client wrapper in `src/lib/apiClient.js`
- [x] 2.2 Configure request interceptor to attach Bearer token authorization header if present in local storage
- [x] 2.3 Configure response interceptor to globally handle 401 Unauthorized status
- [x] 2.4 Create `.env` and `.env.example` files to store backend API base URL configurations

## 3. Sample Feature Integration

- [x] 3.1 Implement a GET request calling function inside `src/features/products/api/getProducts.js`
- [x] 3.2 Create custom React hook `src/features/products/hooks/useProducts.js` to manage loading, error, and data fetching state using React state primitives
- [x] 3.3 Build `src/features/products/components/ProductList.jsx` to render fetched products
- [x] 3.4 Export the public parts of the feature via `src/features/products/index.js`

## 4. Verification

- [x] 4.1 Verify directories are setup correctly and code compiles without errors
- [x] 4.2 Check that environment variable bindings load appropriately inside the Axios client config
