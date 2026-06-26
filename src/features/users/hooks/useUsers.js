import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/usersApi';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(5);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getUsers(skip, limit);
      setUsers(result || []);
    } catch (err) {
      console.error('API connection failed:', err);
      setError(err);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [skip, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (payload) => {
    try {
      const newUser = await createUser(payload);
      await fetchUsers();
      return newUser;
    } catch (err) {
      throw new Error(err.message || 'Failed to create user');
    }
  };

  const editUser = async (userId, payload) => {
    try {
      const updated = await updateUser(userId, payload);
      await fetchUsers();
      return updated;
    } catch (err) {
      throw new Error(err.message || 'Failed to update user');
    }
  };

  const removeUser = async (userId) => {
    try {
      const deleted = await deleteUser(userId);
      await fetchUsers();
      return deleted;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete user');
    }
  };

  const nextPage = () => {
    if (users.length === limit) {
      setSkip(prev => prev + limit);
    }
  };

  const prevPage = () => {
    setSkip(prev => Math.max(0, prev - limit));
  };

  return {
    users,
    isLoading,
    error,
    isOffline: false,
    skip,
    limit,
    addUser,
    editUser,
    removeUser,
    nextPage,
    prevPage,
    refetch: fetchUsers
  };
};
