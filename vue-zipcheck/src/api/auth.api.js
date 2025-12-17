import http from './http';

/**
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
export const login = (credentials) => {
  return http.post('/auth/login', credentials).then(response => response.data);
};

export const logout = () => {
  return http.post('/auth/logout');
};
