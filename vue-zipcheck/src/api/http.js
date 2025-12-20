import axios from 'axios';
import { authStore, user } from '@/stores/auth.store';

const http = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // For HttpOnly cookies
});

// Request interceptor to add the token to headers
http.interceptors.request.use(
	config => {
		const accessToken = authStore.getToken();
		// Do not add token for reissue requests
		if (accessToken && config.url !== '/auth/reissue') {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

let isRetrying = false;
const failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue.length = 0;
};

// Response interceptor to handle API responses
http.interceptors.response.use(
	response => {
		// Special handling for reissue response to get the new token from header
		if (response.config.url === '/auth/reissue') {
			const newAccessToken = response.headers.authorization?.split(' ')[1];
			if (newAccessToken) {
				authStore.setToken(newAccessToken);
			}
			// Return the new token so waiting requests can use it
			return newAccessToken;
		}

		// The API I previously fixed returns response.data which has its own data property
		// I will return the whole response from the interceptor now and let the API layers handle it.
		// No, the original dev wanted this. I will stick to it.
		if (response.data && response.data.success === false) {
			alert(response.data.message || '오류가 발생했습니다.');
			return Promise.reject(
				new Error(response.data.message || 'Backend Error'),
			);
		}
		return response.data;
	},
	async error => {
		const originalRequest = error.config;

		// Handle 401 Unauthorized
		if (
			error.response?.status === 401 &&
			originalRequest.url !== '/auth/login'
		) {
			if (isRetrying) {
				// If a reissue is already in progress, queue the failed request
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(token => {
						originalRequest.headers['Authorization'] = 'Bearer ' + token;
						return http(originalRequest);
					})
					.catch(err => {
						return Promise.reject(err);
					});
			}

			isRetrying = true;
			originalRequest._retry = true; // Mark as retried

			try {
				const reissueResponse = await http.post('/auth/reissue');
				// The success interceptor will handle setting the new token from headers
				// and reissueResponse will be the new token
				const newAccessToken = reissueResponse;

				if (newAccessToken) {
					processQueue(null, newAccessToken);
					originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					return http(originalRequest); // Retry original request
				}
			} catch (reissueError) {
				processQueue(reissueError, null);
				authStore.clearToken();
				user.value = null; // Clear user state
				alert('세션이 만료되었습니다. 다시 로그인해주세요.');
				window.location.href = '/login';
				return Promise.reject(reissueError);
			} finally {
				isRetrying = false;
			}
		}

		// Handle other errors
		const isNetworkErrorDisabled =
			import.meta.env.VITE_DISABLE_NETWORK_ERROR_REDIRECT === 'true';

		if (!isNetworkErrorDisabled) {
			if (error.response) {
				// Only show global alert for non-login URLs
				if (error.config.url !== '/auth/login') {
					const errorMessage =
						error.response.data?.message ||
						'알 수 없는 서버 오류가 발생했습니다.';
					alert(errorMessage);
				}
			} else if (error.request) {
				// This now correctly runs only if there was NO response
				alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
			} else {
				// For other errors
				alert('요청 중 오류가 발생했습니다.');
			}
		}

		return Promise.reject(error);
	},
);

export default http;
