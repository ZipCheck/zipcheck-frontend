import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the token to headers
http.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle API responses
http.interceptors.response.use(
  (response) => {
    // Assuming backend sends { success: boolean, message: string, data: T }
    if (response.data && response.data.success === false) {
      // You can handle the error globally here, e.g., show a toast notification
      alert(response.data.message || 'An error occurred');
      return Promise.reject(new Error(response.data.message || 'Error'));
    }
    return response.data; // Return only the data part of the response
  },
  (error) => {
    if (error.response) {
      // Handle HTTP error codes
      if (error.response.status === 401) {
        // Unauthorized: remove token and redirect to login
        localStorage.removeItem('accessToken');
        alert('Authentication failed. Please log in again.');
        // Using window.location to redirect, as router might not be available here
        window.location.href = '/login';
      } else {
        // Handle other HTTP errors
        const errorMessage = error.response.data?.message || 'An unexpected error occurred.';
        alert(errorMessage);
      }
    } else {
      // Handle network errors
      alert('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default http;
