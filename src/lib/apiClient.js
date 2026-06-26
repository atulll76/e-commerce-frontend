import axios from 'axios';

const getInitialBaseURL = () => {
  const rawUrl = localStorage.getItem('api_host') || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  return rawUrl.replace(/\/$/, '');
};

// Create a configured axios instance
export const apiClient = axios.create({
  baseURL: getInitialBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Dynamically updates the API client base URL and persists it
 * @param {string} newHost The backend API host URL
 */
export const updateApiHost = (newHost) => {
  if (newHost) {
    const sanitizedHost = newHost.replace(/\/$/, '');
    apiClient.defaults.baseURL = sanitizedHost;
    localStorage.setItem('api_host', sanitizedHost);
  }
};

// Request interceptor to attach Authorization Bearer tokens automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to simplify response data access and globally handle errors
apiClient.interceptors.response.use(
  (response) => {
    // Return only the data payload
    return response.data;
  },
  (error) => {
    // Globally handle specific HTTP status codes (e.g., 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access detected. Redirecting or cleaning up session...');
      localStorage.removeItem('auth_token');
      // In a real application, you could trigger a redirect or context/state update here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
