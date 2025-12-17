import http from './http';

/**
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
export const login = credentials => {
	return http.post('/auth/login', credentials).then(response => response.data);
};

export const logout = () => {
	return http.post('/auth/logout');
};

/**
 * @param {string} email
 */
export const sendPasswordResetCode = email => {
  return http.post('/auth/password/code', { email });
};

/**
 * @param {string} email
 * @param {string} authCode
 */
export const resetPassword = (email, authCode) => {
  return http.post('/auth/password/reset', { email, authCode });
};
