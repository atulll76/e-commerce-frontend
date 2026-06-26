import { apiClient } from '../../../lib/apiClient';

/**
 * Fetch products from the backend REST API
 * @param {string} [category] Optional category filter
 * @returns {Promise<Array>} Promise resolving to the list of products
 */
export const getProducts = async (category = '') => {
  return apiClient.get('/products', {
    params: category ? { category } : {},
  });
};
