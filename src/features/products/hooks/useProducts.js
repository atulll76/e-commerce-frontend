import { useState, useEffect } from 'react';
import { getProducts } from '../api/getProducts';

/**
 * Custom React hook to fetch products and manage request states
 * @param {string} category Optional category to filter products
 * @returns {{ data: Array, isLoading: boolean, error: Error|null, refetch: Function }}
 */
export const useProducts = (category = '') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getProducts(category);
      setData(result || []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};
