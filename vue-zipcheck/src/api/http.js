import axios from 'axios';
import { authStore } from '@/stores/auth.store';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the token to headers
http.interceptors.request.use(
  (config) => {
    const accessToken = authStore.getToken();
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
    // Backend can indicate success:false for business logic errors
    if (response.data && response.data.success === false) {
      alert(response.data.message || '오류가 발생했습니다.');
      return Promise.reject(new Error(response.data.message || 'Backend Error'));
    }
    return response.data; // Return only the data part of the response
  },
  (error) => {
    if (error.response) {
      // Handle HTTP error codes
      if (error.response.status === 401) {
        // Unauthorized: remove token and redirect to login
        authStore.clearToken();
        alert('인증에 실패했습니다. 다시 로그인해주세요.');
        window.location.href = '/login';
      } else {
        // Handle other HTTP errors (404, 500, etc.)
        const errorMessage = error.response.data?.message || '알 수 없는 서버 오류가 발생했습니다.';
        alert(`${errorMessage} 홈페이지로 이동합니다.`);
        window.location.href = '/';
      }
    } else {
      // Handle network errors (e.g., connection refused)
      alert('네트워크 연결에 문제가 있습니다. 홈페이지로 이동합니다.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default http;
