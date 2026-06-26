import { apiClient } from '../../../lib/apiClient';

/**
 * Get paginated list of users
 * @param {number} skip Number of items to skip
 * @param {number} limit Page size limit
 */
export const getUsers = async (skip = 0, limit = 100) => {
  return apiClient.get('/users', {
    params: { skip, limit },
  });
};

/**
 * Get user profile by ID
 * @param {string|number} userId User ID
 */
export const getUserById = async (userId) => {
  return apiClient.get(`/users/${userId}`);
};

/**
 * Create a new user profile
 * @param {object} userPayload User registration data
 */
export const createUser = async (userPayload) => {
  return apiClient.post('/users', userPayload);
};

/**
 * Update user details by ID
 * @param {string|number} userId User ID
 * @param {object} userPayload User data to update
 */
export const updateUser = async (userId, userPayload) => {
  return apiClient.put(`/users/${userId}`, userPayload);
};

/**
 * Delete user profile by ID
 * @param {string|number} userId User ID
 */
export const deleteUser = async (userId) => {
  return apiClient.delete(`/users/${userId}`);
};
